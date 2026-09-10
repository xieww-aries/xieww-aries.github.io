import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
	Bounds,
	buildPaths,
	createGraticule,
	createProjector,
	MapData,
	MapFeature,
	MapPaths,
	pickFeature
} from './geo';

import './GeoMap.scss';

export type MapStatus = 'loading' | 'ready' | 'error';

export interface MapTip {
	name: string;
	sub?: string;
}

interface View {
	k: number;
	tx: number;
	ty: number;
}

interface PointerPoint {
	x: number;
	y: number;
}

interface DragState {
	pointerId: number;
	startX: number;
	startY: number;
	originTx: number;
	originTy: number;
	moved: boolean;
}

interface PinchState {
	distance: number;
	midX: number;
	midY: number;
}

interface IProps {
	data: MapData | null;
	status: MapStatus;
	ariaLabel: string;
	error?: string | null;
	hint?: string;
	graticule?: { lonStep: number; latStep: number } | null;
	standardParallel?: number;
	minLabelArea?: number;
	labelSize?: number;
	selectedId?: string | null;
	labelFor?: (feature: MapFeature) => string;
	tipFor?: (feature: MapFeature) => MapTip;
	onSelect?: (feature: MapFeature | null) => void;
	onHover?: (feature: MapFeature | null) => void;
	onRetry?: () => void;
}

const PADDING = 26;
const EDGE_MARGIN = 96;
const MIN_ZOOM = 0.75;
const MAX_ZOOM = 60;
const DRAG_THRESHOLD = 3;
const MAX_DPR = 2;
const ZOOM_STEP = 1.45;

const SEA_FROM = '#151b25';
const SEA_TO = '#0d1015';
const LAND_FILL = '#232a36';
const LAND_STROKE = 'rgba(242, 239, 232, 0.18)';
const HOVER_FILL = 'rgba(212, 160, 84, 0.2)';
const HOVER_STROKE = 'rgba(212, 160, 84, 0.85)';
const SELECTED_FILL = 'rgba(212, 160, 84, 0.32)';
const SELECTED_STROKE = '#e8c07a';
const GRATICLE_LINE = 'rgba(126, 184, 201, 0.13)';
const GRATICLE_MAJOR = 'rgba(126, 184, 201, 0.28)';
const LABEL_COLOR = 'rgba(242, 239, 232, 0.76)';
const LABEL_ACTIVE = '#f6d79a';
const LABEL_HALO = 'rgba(9, 11, 15, 0.85)';
const FONT_STACK = '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';

function clamp(value: number, min: number, max: number) {
	if (max < min) {
		return min;
	}

	return Math.min(Math.max(value, min), max);
}

function overlaps(a: number[], b: number[]) {
	return a[0] < b[0] + b[2] && a[0] + a[2] > b[0] && a[1] < b[1] + b[3] && a[1] + a[3] > b[1];
}

function defaultTip(feature: MapFeature): MapTip {
	return { name: feature.name };
}

function defaultLabel(feature: MapFeature) {
	return feature.name;
}

export default function GeoMap(props: IProps) {
	const {
		data,
		status,
		ariaLabel,
		error,
		hint,
		graticule,
		standardParallel = 0,
		minLabelArea = 200,
		labelSize = 11,
		selectedId,
		labelFor,
		tipFor,
		onSelect,
		onHover,
		onRetry
	} = props;

	const shellRef = useRef<HTMLDivElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const tipRef = useRef<HTMLDivElement | null>(null);
	const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
	const viewRef = useRef<View>({ k: 1, tx: 0, ty: 0 });
	const fitRef = useRef<View>({ k: 1, tx: 0, ty: 0 });
	const boundsRef = useRef<Bounds>([0, 0, 1, 1]);
	const dataRef = useRef<MapData | null>(null);
	const hoverRef = useRef<MapFeature | null>(null);
	const dragRef = useRef<DragState | null>(null);
	const pinchRef = useRef<PinchState | null>(null);
	const pointersRef = useRef(new Map<number, PointerPoint>());
	const drawRef = useRef<() => void>(() => {});
	const selectedRef = useRef<string | null>(null);
	const layoutDataRef = useRef<MapData | null>(null);
	const handlersRef = useRef({ labelFor, tipFor, onSelect, onHover });

	const [zoom, setZoom] = useState(100);
	const [tip, setTip] = useState<MapTip | null>(null);

	const paths: MapPaths | null = useMemo(() => (data ? buildPaths(data) : null), [data]);

	const pathById = useMemo(() => {
		const map = new Map<string, Path2D>();

		if (paths) {
			paths.items.forEach(item => map.set(item.feature.id, item.path));
		}

		return map;
	}, [paths]);

	const graticulePaths = useMemo(() => {
		if (!data || !graticule) {
			return null;
		}

		const lines = createGraticule(data.geoBounds, createProjector(standardParallel), graticule.lonStep, graticule.latStep);
		const minor = new Path2D();
		const major = new Path2D();

		lines.forEach(line => {
			const target = line.major ? major : minor;

			target.moveTo(line.points[0], line.points[1]);

			for (let i = 2; i < line.points.length; i += 2) {
				target.lineTo(line.points[i], line.points[i + 1]);
			}
		});

		return { minor, major };
	}, [data, graticule, standardParallel]);

	const draw = useCallback(() => {
		const canvas = canvasRef.current;
		const context = canvas ? canvas.getContext('2d') : null;

		if (!context || !paths) {
			return;
		}

		const { width, height, dpr } = sizeRef.current;
		const { k, tx, ty } = viewRef.current;
		const hovered = hoverRef.current;
		const selected = selectedRef.current;
		const label = handlersRef.current.labelFor || defaultLabel;

		context.setTransform(dpr, 0, 0, dpr, 0, 0);
		context.clearRect(0, 0, width, height);

		const sea = context.createLinearGradient(0, 0, width * 0.4, height);

		sea.addColorStop(0, SEA_FROM);
		sea.addColorStop(1, SEA_TO);
		context.fillStyle = sea;
		context.fillRect(0, 0, width, height);

		context.save();
		context.translate(tx, ty);
		context.scale(k, k);
		context.lineJoin = 'round';
		context.lineCap = 'round';

		if (graticulePaths) {
			context.lineWidth = 1 / k;
			context.strokeStyle = GRATICLE_LINE;
			context.stroke(graticulePaths.minor);
			context.strokeStyle = GRATICLE_MAJOR;
			context.stroke(graticulePaths.major);
		}

		context.fillStyle = LAND_FILL;
		context.fill(paths.base, 'evenodd');
		context.lineWidth = 1 / k;
		context.strokeStyle = LAND_STROKE;
		context.stroke(paths.base);

		const highlight = (id: string | null, fill: string, stroke: string, strokeWidth: number) => {
			const path = id ? pathById.get(id) : undefined;

			if (!path) {
				return;
			}

			context.fillStyle = fill;
			context.fill(path, 'evenodd');
			context.lineWidth = strokeWidth / k;
			context.strokeStyle = stroke;
			context.stroke(path);
		};

		highlight(selected, SELECTED_FILL, SELECTED_STROKE, 1.6);
		highlight(hovered && hovered.id !== selected ? hovered.id : null, HOVER_FILL, HOVER_STROKE, 1.3);
		context.restore();

		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.lineJoin = 'round';
		context.font = `${labelSize}px ${FONT_STACK}`;
		context.lineWidth = 3;

		const placed: number[][] = [];

		const drawLabel = (feature: MapFeature, color: string, force: boolean) => {
			const text = label(feature);

			if (!text) {
				return;
			}

			const x = feature.labelPoint[0] * k + tx;
			const y = feature.labelPoint[1] * k + ty;

			if (x < -40 || y < -16 || x > width + 40 || y > height + 16) {
				return;
			}

			if (!force && feature.area * k * k < minLabelArea) {
				return;
			}

			const boxWidth = context.measureText(text).width + 6;
			const boxHeight = labelSize + 4;
			const box = [x - boxWidth / 2, y - boxHeight / 2, boxWidth, boxHeight];

			if (!force) {
				if (placed.some(rect => overlaps(rect, box))) {
					return;
				}
			}

			placed.push(box);
			context.strokeStyle = LABEL_HALO;
			context.strokeText(text, x, y);
			context.fillStyle = color;
			context.fillText(text, x, y);
		};

		paths.labels.forEach(feature => {
			drawLabel(feature, LABEL_COLOR, false);
		});

		if (selected) {
			const feature = paths.labels.filter(item => item.id === selected)[0];

			if (feature) {
				drawLabel(feature, LABEL_ACTIVE, true);
			}
		}

		if (hovered && hovered.id !== selected) {
			drawLabel(hovered, LABEL_ACTIVE, true);
		}
	}, [paths, pathById, graticulePaths, minLabelArea, labelSize]);

	const applyView = useCallback((next: View) => {
		const fit = fitRef.current;
		const { width, height } = sizeRef.current;
		const [minX, minY, maxX, maxY] = boundsRef.current;
		const k = clamp(next.k, fit.k * MIN_ZOOM, fit.k * MAX_ZOOM);
		// 允许自由拖动，同时保证地图不会完全离开视口
		const tx = clamp(next.tx, EDGE_MARGIN - maxX * k, width - EDGE_MARGIN - minX * k);
		const ty = clamp(next.ty, EDGE_MARGIN - maxY * k, height - EDGE_MARGIN - minY * k);

		viewRef.current = { k, tx, ty };
		setZoom(fit.k ? Math.round((k / fit.k) * 100) : 100);
		drawRef.current();
	}, []);

	const zoomAt = useCallback(
		(x: number, y: number, factor: number) => {
			const view = viewRef.current;
			const fit = fitRef.current;
			const ratio = clamp(view.k * factor, fit.k * MIN_ZOOM, fit.k * MAX_ZOOM) / view.k;

			applyView({
				k: view.k * ratio,
				tx: x - (x - view.tx) * ratio,
				ty: y - (y - view.ty) * ratio
			});
		},
		[applyView]
	);

	const zoomBy = useCallback(
		(factor: number) => {
			const { width, height } = sizeRef.current;

			zoomAt(width / 2, height / 2, factor);
		},
		[zoomAt]
	);

	const resetView = useCallback(() => applyView(fitRef.current), [applyView]);

	const relayout = useCallback(() => {
		const shell = shellRef.current;
		const canvas = canvasRef.current;
		const mapData = dataRef.current;

		if (!shell || !canvas || !mapData) {
			return;
		}

		const rect = shell.getBoundingClientRect();
		const width = Math.max(1, Math.round(rect.width));
		const height = Math.max(1, Math.round(rect.height));
		const dpr = clamp(window.devicePixelRatio || 1, 1, MAX_DPR);
		const previous = sizeRef.current;
		const previousFit = fitRef.current;
		const freshData = layoutDataRef.current !== mapData;

		layoutDataRef.current = mapData;

		const [minX, minY, maxX, maxY] = mapData.bounds;
		const spanX = Math.max(maxX - minX, 1e-6);
		const spanY = Math.max(maxY - minY, 1e-6);
		const k = Math.min((width - PADDING * 2) / spanX, (height - PADDING * 2) / spanY);
		const fit = {
			k,
			tx: (width - spanX * k) / 2 - minX * k,
			ty: (height - spanY * k) / 2 - minY * k
		};

		canvas.width = Math.round(width * dpr);
		canvas.height = Math.round(height * dpr);
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;

		sizeRef.current = { width, height, dpr };
		boundsRef.current = mapData.bounds;
		fitRef.current = fit;

		if (previous.width && previousFit.k && !freshData) {
			const ratio = viewRef.current.k / previousFit.k;
			const centerX = (previous.width / 2 - viewRef.current.tx) / viewRef.current.k;
			const centerY = (previous.height / 2 - viewRef.current.ty) / viewRef.current.k;

			applyView({
				k: fit.k * ratio,
				tx: width / 2 - centerX * fit.k * ratio,
				ty: height / 2 - centerY * fit.k * ratio
			});
		} else {
			applyView(fit);
		}
	}, [applyView]);

	useEffect(() => {
		handlersRef.current = { labelFor, tipFor, onSelect, onHover };
	});

	useEffect(() => {
		drawRef.current = draw;
		draw();
	}, [draw]);

	useEffect(() => {
		selectedRef.current = selectedId || null;
		drawRef.current();
	}, [selectedId]);

	useEffect(() => {
		dataRef.current = data;
		hoverRef.current = null;
		setTip(null);
		relayout();
	}, [data, relayout]);

	useEffect(() => {
		const shell = shellRef.current;

		if (!shell || typeof ResizeObserver === 'undefined') {
			return undefined;
		}

		const observer = new ResizeObserver(() => relayout());

		observer.observe(shell);

		return () => observer.disconnect();
	}, [relayout]);

	useEffect(() => {
		const canvas = canvasRef.current;

		if (!canvas) {
			return undefined;
		}

		const positionOf = (event: { clientX: number; clientY: number }) => {
			const rect = canvas.getBoundingClientRect();

			return { x: event.clientX - rect.left, y: event.clientY - rect.top };
		};

		const featureAt = (x: number, y: number) => {
			const mapData = dataRef.current;

			if (!mapData) {
				return null;
			}

			const view = viewRef.current;

			return pickFeature(mapData, (x - view.tx) / view.k, (y - view.ty) / view.k);
		};

		const clearHover = () => {
			if (!hoverRef.current) {
				return;
			}

			hoverRef.current = null;
			setTip(null);
			canvas.style.cursor = dragRef.current ? 'grabbing' : 'grab';

			const { onHover } = handlersRef.current;

			if (onHover) {
				onHover(null);
			}

			drawRef.current();
		};

		const placeTip = (x: number, y: number) => {
			const element = tipRef.current;
			const { width, height } = sizeRef.current;

			if (!element) {
				return;
			}

			const boxWidth = element.offsetWidth || 140;
			const boxHeight = element.offsetHeight || 44;
			const left = clamp(x + 16, 8, Math.max(8, width - boxWidth - 8));
			const top = clamp(y - boxHeight - 14, 8, Math.max(8, height - boxHeight - 8));

			element.style.transform = `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)`;
		};

		const updateHover = (x: number, y: number) => {
			const feature = featureAt(x, y);
			const current = hoverRef.current;

			if ((feature ? feature.id : null) !== (current ? current.id : null)) {
				hoverRef.current = feature;

				const { tipFor: resolveTip, onHover } = handlersRef.current;

				setTip(feature ? (resolveTip || defaultTip)(feature) : null);
				canvas.style.cursor = dragRef.current ? 'grabbing' : feature ? 'pointer' : 'grab';

				if (onHover) {
					onHover(feature);
				}

				drawRef.current();
			}

			if (feature) {
				placeTip(x, y);
			}
		};

		const onPointerDown = (event: PointerEvent) => {
			if (event.pointerType === 'mouse' && event.button !== 0) {
				return;
			}

			const { x, y } = positionOf(event);

			pointersRef.current.set(event.pointerId, { x, y });

			if (typeof canvas.setPointerCapture === 'function') {
				canvas.setPointerCapture(event.pointerId);
			}

			if (pointersRef.current.size >= 2) {
				const points = Array.from(pointersRef.current.values());
				const [first, second] = points;

				pinchRef.current = {
					distance: Math.hypot(first.x - second.x, first.y - second.y),
					midX: (first.x + second.x) / 2,
					midY: (first.y + second.y) / 2
				};
				dragRef.current = null;

				return;
			}

			pinchRef.current = null;
			dragRef.current = {
				pointerId: event.pointerId,
				startX: x,
				startY: y,
				originTx: viewRef.current.tx,
				originTy: viewRef.current.ty,
				moved: false
			};
			canvas.style.cursor = 'grabbing';
		};

		const onPointerMove = (event: PointerEvent) => {
			const stored = pointersRef.current.get(event.pointerId);
			const { x, y } = positionOf(event);
			const { width, height } = sizeRef.current;
			const inside = x >= 0 && y >= 0 && x <= width && y <= height;

			if (stored) {
				stored.x = x;
				stored.y = y;
			}

			const pinch = pinchRef.current;

			if (pinch && pointersRef.current.size >= 2) {
				const points = Array.from(pointersRef.current.values());
				const [first, second] = points;
				const distance = Math.hypot(first.x - second.x, first.y - second.y);
				const midX = (first.x + second.x) / 2;
				const midY = (first.y + second.y) / 2;

				if (pinch.distance > 0 && distance > 0) {
					zoomAt(midX, midY, distance / pinch.distance);
				}

				const view = viewRef.current;

				applyView({ k: view.k, tx: view.tx + midX - pinch.midX, ty: view.ty + midY - pinch.midY });

				pinch.distance = distance;
				pinch.midX = midX;
				pinch.midY = midY;

				return;
			}

			const drag = dragRef.current;

			if (drag && drag.pointerId === event.pointerId) {
				const dx = x - drag.startX;
				const dy = y - drag.startY;

				if (!drag.moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
					drag.moved = true;
					clearHover();
				}

				if (drag.moved) {
					applyView({ k: viewRef.current.k, tx: drag.originTx + dx, ty: drag.originTy + dy });
				}

				return;
			}

			if (!pointersRef.current.size) {
				if (inside) {
					updateHover(x, y);
				} else {
					clearHover();
				}
			}
		};

		const onPointerUp = (event: PointerEvent) => {
			pointersRef.current.delete(event.pointerId);

			if (pointersRef.current.size < 2) {
				pinchRef.current = null;
			}

			const drag = dragRef.current;

			if (drag && drag.pointerId === event.pointerId) {
				dragRef.current = null;
				canvas.style.cursor = hoverRef.current ? 'pointer' : 'grab';

				if (!drag.moved) {
					const { x, y } = positionOf(event);
					const feature = featureAt(x, y);
					const { onSelect } = handlersRef.current;

					if (onSelect) {
						onSelect(feature);
					}

					updateHover(x, y);
				}

				return;
			}

			if (!pointersRef.current.size) {
				const { x, y } = positionOf(event);

				if (x < 0 || y < 0 || x > sizeRef.current.width || y > sizeRef.current.height) {
					clearHover();
				}
			}
		};

		const onPointerLeave = () => {
			if (!dragRef.current) {
				clearHover();
			}
		};

		const onWheel = (event: WheelEvent) => {
			if (!dataRef.current) {
				return;
			}

			event.preventDefault();

			const { x, y } = positionOf(event);
			const unit = event.deltaMode === 1 ? 16 : 1;
			const factor = Math.exp(-event.deltaY * unit * 0.0016);

			zoomAt(x, y, clamp(factor, 0.6, 1.7));
		};

		const onDoubleClick = (event: MouseEvent) => {
			event.preventDefault();

			const { x, y } = positionOf(event);

			zoomAt(x, y, 1.8);
		};

		canvas.addEventListener('pointerdown', onPointerDown);
		canvas.addEventListener('pointerleave', onPointerLeave);
		canvas.addEventListener('wheel', onWheel, { passive: false });
		canvas.addEventListener('dblclick', onDoubleClick);
		window.addEventListener('pointermove', onPointerMove);
		window.addEventListener('pointerup', onPointerUp);
		window.addEventListener('pointercancel', onPointerUp);

		return () => {
			canvas.removeEventListener('pointerdown', onPointerDown);
			canvas.removeEventListener('pointerleave', onPointerLeave);
			canvas.removeEventListener('wheel', onWheel);
			canvas.removeEventListener('dblclick', onDoubleClick);
			window.removeEventListener('pointermove', onPointerMove);
			window.removeEventListener('pointerup', onPointerUp);
			window.removeEventListener('pointercancel', onPointerUp);
		};
	}, [applyView, zoomAt]);

	const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		const view = viewRef.current;
		const step = 48;

		switch (event.key) {
			case 'ArrowUp':
				applyView({ ...view, ty: view.ty + step });
				break;
			case 'ArrowDown':
				applyView({ ...view, ty: view.ty - step });
				break;
			case 'ArrowLeft':
				applyView({ ...view, tx: view.tx + step });
				break;
			case 'ArrowRight':
				applyView({ ...view, tx: view.tx - step });
				break;
			case '+':
			case '=':
				zoomBy(ZOOM_STEP);
				break;
			case '-':
			case '_':
				zoomBy(1 / ZOOM_STEP);
				break;
			case '0':
				resetView();
				break;
			case 'Escape':
				if (onSelect) {
					onSelect(null);
				}
				break;
			default:
				return;
		}

		event.preventDefault();
	};

	return (
		<div styleName="geo-map">
			<div
				styleName="shell"
				ref={shellRef}
				tabIndex={0}
				role="application"
				aria-label={ariaLabel}
				onKeyDown={onKeyDown}
			>
				<canvas styleName="canvas" ref={canvasRef} />
				<div styleName={tip ? 'tip show' : 'tip'} ref={tipRef} aria-hidden="true">
					{tip ? (
						<React.Fragment>
							<strong styleName="tip-name">{tip.name}</strong>
							{tip.sub ? <span styleName="tip-sub">{tip.sub}</span> : null}
						</React.Fragment>
					) : null}
				</div>
				<div styleName="controls">
					<button type="button" styleName="control" onClick={() => zoomBy(ZOOM_STEP)} aria-label="放大">
						＋
					</button>
					<button type="button" styleName="control" onClick={() => zoomBy(1 / ZOOM_STEP)} aria-label="缩小">
						－
					</button>
					<button type="button" styleName="control wide" onClick={resetView}>
						复位
					</button>
					<span styleName="zoom">{zoom}%</span>
				</div>
				{status !== 'ready' ? (
					<div styleName="overlay">
						{status === 'loading' ? (
							<p styleName="overlay-text loading">地图数据加载中…</p>
						) : (
							<div styleName="overlay-box">
								<p styleName="overlay-text">{error || '地图数据加载失败'}</p>
								{onRetry ? (
									<button type="button" styleName="retry" onClick={onRetry}>
										重新加载
									</button>
								) : null}
							</div>
						)}
					</div>
				) : null}
			</div>
			{hint ? <p styleName="hint">{hint}</p> : null}
		</div>
	);
}
