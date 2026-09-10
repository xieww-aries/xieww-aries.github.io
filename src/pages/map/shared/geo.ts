export type Position = [number, number];

export type Bounds = [number, number, number, number];

export interface RawGeometry {
	type: string;
	coordinates: any;
}

export interface RawFeature {
	type: string;
	id?: string | number;
	properties?: Record<string, any>;
	geometry: RawGeometry;
}

export interface RawFeatureCollection {
	type: string;
	features: RawFeature[];
}

export interface MapFeature {
	id: string;
	name: string;
	polygons: Float64Array[][];
	bounds: Bounds;
	labelPoint: Position;
	area: number;
	vertices: number;
	properties: Record<string, any>;
}

export interface MapData {
	features: MapFeature[];
	bounds: Bounds;
	geoBounds: Bounds;
}

export interface MapPaths {
	base: Path2D;
	items: Array<{ feature: MapFeature; path: Path2D }>;
	labels: MapFeature[];
}

export type Projector = (lon: number, lat: number) => Position;

const RING_EDGE = 1e-4;

/**
 * 等距圆柱投影：x 按标准纬线余弦压缩，y 取反让北方朝上
 *
 * @param {number} standardParallel 标准纬线（度）
 * @return {Projector}
 */
export function createProjector(standardParallel: number): Projector {
	const ratio = Math.cos((standardParallel * Math.PI) / 180);

	return (lon, lat) => [lon * ratio, -lat];
}

function ringArea(ring: Float64Array) {
	let sum = 0;

	for (let i = 0, j = ring.length - 2; i < ring.length; j = i, i += 2) {
		sum += ring[j] * ring[i + 1] - ring[i] * ring[j + 1];
	}

	return Math.abs(sum / 2);
}

function ringCentroid(ring: Float64Array): Position {
	let twice = 0;
	let cx = 0;
	let cy = 0;

	for (let i = 0, j = ring.length - 2; i < ring.length; j = i, i += 2) {
		const cross = ring[j] * ring[i + 1] - ring[i] * ring[j + 1];
		twice += cross;
		cx += (ring[j] + ring[i]) * cross;
		cy += (ring[j + 1] + ring[i + 1]) * cross;
	}

	if (Math.abs(twice) < RING_EDGE) {
		return ringBoundsCenter(ring);
	}

	return [cx / (3 * twice), cy / (3 * twice)];
}

function ringBounds(ring: Float64Array): Bounds {
	let minX = Infinity;
	let minY = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;

	for (let i = 0; i < ring.length; i += 2) {
		const x = ring[i];
		const y = ring[i + 1];

		if (x < minX) minX = x;
		if (y < minY) minY = y;
		if (x > maxX) maxX = x;
		if (y > maxY) maxY = y;
	}

	return [minX, minY, maxX, maxY];
}

function ringBoundsCenter(ring: Float64Array): Position {
	const [minX, minY, maxX, maxY] = ringBounds(ring);

	return [(minX + maxX) / 2, (minY + maxY) / 2];
}

/**
 * 扫描线求内部点：凹形（越南、挪威、海地这类）用形心会落到轮廓外，
 * 这里取最宽的一条水平弦的中点，保证落在多边形内部
 *
 * @param {Float64Array} ring 投影后的环
 * @return {Position}
 */
function ringInteriorPoint(ring: Float64Array, steps = 24): Position | null {
	const [, minY, , maxY] = ringBounds(ring);
	let best: Position | null = null;
	let bestWidth = 0;

	for (let i = 1; i < steps; i++) {
		const y = minY + ((maxY - minY) * i) / steps;
		const crossings: number[] = [];

		for (let a = 0, b = ring.length - 2; a < ring.length; b = a, a += 2) {
			const ya = ring[a + 1];
			const yb = ring[b + 1];

			if (ya > y === yb > y) {
				continue;
			}

			crossings.push(ring[a] + ((y - ya) * (ring[b] - ring[a])) / (yb - ya));
		}

		crossings.sort((left, right) => left - right);

		for (let j = 0; j + 1 < crossings.length; j += 2) {
			const width = crossings[j + 1] - crossings[j];

			if (width > bestWidth) {
				bestWidth = width;
				best = [(crossings[j] + crossings[j + 1]) / 2, y];
			}
		}
	}

	return best;
}

function mergeBounds(target: Bounds, next: Bounds): Bounds {
	return [
		Math.min(target[0], next[0]),
		Math.min(target[1], next[1]),
		Math.max(target[2], next[2]),
		Math.max(target[3], next[3])
	];
}

interface GeoAccumulator {
	minLon: number;
	minLat: number;
	maxLon: number;
	maxLat: number;
}

function projectRing(ring: any[], project: Projector, geo: GeoAccumulator) {
	const points = new Float64Array(ring.length * 2);

	for (let i = 0; i < ring.length; i++) {
		const lon = ring[i][0];
		const lat = ring[i][1];
		const [x, y] = project(lon, lat);

		points[i * 2] = x;
		points[i * 2 + 1] = y;

		if (lon < geo.minLon) geo.minLon = lon;
		if (lat < geo.minLat) geo.minLat = lat;
		if (lon > geo.maxLon) geo.maxLon = lon;
		if (lat > geo.maxLat) geo.maxLat = lat;
	}

	return points;
}

function isInsideRing(ring: Float64Array, x: number, y: number) {
	let inside = false;

	for (let i = 0, j = ring.length - 2; i < ring.length; j = i, i += 2) {
		const xi = ring[i];
		const yi = ring[i + 1];
		const xj = ring[j];
		const yj = ring[j + 1];

		if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
			inside = !inside;
		}
	}

	return inside;
}

/**
 * 点是否落在要素内（外环包含且不在任何内环里）
 */
export function isInsideFeature(feature: MapFeature, x: number, y: number) {
	const [minX, minY, maxX, maxY] = feature.bounds;

	if (x < minX || x > maxX || y < minY || y > maxY) {
		return false;
	}

	return feature.polygons.some(polygon => {
		const [outer, ...holes] = polygon;

		return isInsideRing(outer, x, y) && !holes.some(hole => isInsideRing(hole, x, y));
	});
}

/**
 * 命中检测：倒序遍历，后绘制的要素优先
 */
export function pickFeature(data: MapData, x: number, y: number): MapFeature | null {
	for (let i = data.features.length - 1; i >= 0; i--) {
		const feature = data.features[i];

		if (isInsideFeature(feature, x, y)) {
			return feature;
		}
	}

	return null;
}

/**
 * GeoJSON -> 投影后的可绘制要素
 */
export function prepareMap(collection: RawFeatureCollection, project: Projector): MapData {
	const features: MapFeature[] = [];
	let bounds: Bounds = [Infinity, Infinity, -Infinity, -Infinity];
	const geo: GeoAccumulator = {
		minLon: Infinity,
		minLat: Infinity,
		maxLon: -Infinity,
		maxLat: -Infinity
	};

	collection.features.forEach((raw, index) => {
		const geometry = raw.geometry;

		if (!geometry || !geometry.coordinates) {
			return;
		}

		const groups = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
		const polygons: Float64Array[][] = [];
		let featureBounds: Bounds = [Infinity, Infinity, -Infinity, -Infinity];
		let area = 0;
		let vertices = 0;
		let largest: Float64Array | null = null;
		let largestArea = -1;

		groups.forEach((polygon: any[][]) => {
			const rings = polygon.map(ring => {
				const points = projectRing(ring, project, geo);
				const ringBoundsValue = ringBounds(points);

				featureBounds = mergeBounds(featureBounds, ringBoundsValue);
				vertices += ring.length;

				return points;
			});

			const outerArea = ringArea(rings[0]);

			area += outerArea;

			if (outerArea > largestArea) {
				largestArea = outerArea;
				largest = rings[0];
			}

			polygons.push(rings);
		});

		if (!polygons.length || !largest) {
			return;
		}

		const outerRing: Float64Array = largest;
		const properties = raw.properties || {};
		const candidates: Position[] = [];

		['centroid', 'center'].forEach(key => {
			const value = properties[key];

			if (Array.isArray(value) && value.length === 2) {
				candidates.push(project(value[0], value[1]));
			}
		});

		const interior = ringInteriorPoint(outerRing);

		candidates.push(ringCentroid(outerRing));

		if (interior) {
			candidates.push(interior);
		}

		candidates.push(ringBoundsCenter(outerRing));

		const labelPoint =
			candidates.find(point => isInsideRing(outerRing, point[0], point[1])) || candidates[candidates.length - 1];

		const prepared: MapFeature = {
			id: String(raw.id ?? properties.adcode ?? properties.name ?? index),
			name: String(properties.name ?? ''),
			polygons,
			bounds: featureBounds,
			labelPoint,
			area,
			vertices,
			properties
		};

		features.push(prepared);
		bounds = mergeBounds(bounds, featureBounds);
	});

	return {
		features,
		bounds,
		geoBounds: [geo.minLon, geo.minLat, geo.maxLon, geo.maxLat]
	};
}

/**
 * 预生成 Path2D：底图一次填充，单个要素用于高亮与命中反馈
 */
export function buildPaths(data: MapData): MapPaths {
	const base = new Path2D();
	const items = data.features.map(feature => {
		const path = new Path2D();

		feature.polygons.forEach(polygon => {
			polygon.forEach(ring => {
				if (ring.length < 6) {
					return;
				}

				path.moveTo(ring[0], ring[1]);

				for (let i = 2; i < ring.length; i += 2) {
					path.lineTo(ring[i], ring[i + 1]);
				}

				path.closePath();
			});
		});

		base.addPath(path);

		return { feature, path };
	});

	const labels = data.features.slice().sort((a, b) => b.area - a.area);

	return { base, items, labels };
}

export interface GraticuleLine {
	points: Float64Array;
	major: boolean;
}

/**
 * 经纬网：按经纬度采样后再投影，换投影方式也不用改
 *
 * @param {Bounds} geoBounds 经纬度范围 [minLon, minLat, maxLon, maxLat]
 * @param {Projector} project 投影函数
 * @param {number} lonStep 经线间隔（度）
 * @param {number} latStep 纬线间隔（度）
 * @return {GraticuleLine[]}
 */
export function createGraticule(
	geoBounds: Bounds,
	project: Projector,
	lonStep: number,
	latStep: number,
	sample = 12
): GraticuleLine[] {
	const [minLon, minLat, maxLon, maxLat] = geoBounds;
	const lines: GraticuleLine[] = [];

	const pushLine = (pointAt: (ratio: number) => Position, major: boolean) => {
		const points = new Float64Array((sample + 1) * 2);

		for (let i = 0; i <= sample; i++) {
			const [x, y] = project(...pointAt(i / sample));

			points[i * 2] = x;
			points[i * 2 + 1] = y;
		}

		lines.push({ points, major });
	};

	for (let lon = Math.ceil(minLon / lonStep) * lonStep; lon <= maxLon + RING_EDGE; lon += lonStep) {
		pushLine(ratio => [lon, minLat + (maxLat - minLat) * ratio], Math.abs(lon) < RING_EDGE);
	}

	for (let lat = Math.ceil(minLat / latStep) * latStep; lat <= maxLat + RING_EDGE; lat += latStep) {
		pushLine(ratio => [minLon + (maxLon - minLon) * ratio, lat], Math.abs(lat) < RING_EDGE);
	}

	return lines;
}
