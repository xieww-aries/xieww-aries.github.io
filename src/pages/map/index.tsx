import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Title from '../../components/common/Title';
import GeoMap, { MapTip } from './shared/GeoMap';
import useGeoData from './shared/useGeoData';
import { datasets, mapTips, MapDataset, RegionFact } from './data';
import { MapFeature } from './shared/geo';

import './style.scss';

export default function MapPage() {
	const [dataset, setDataset] = useState<MapDataset>(datasets[0]);
	const [selected, setSelected] = useState<MapFeature | null>(null);
	const [hovered, setHovered] = useState<MapFeature | null>(null);
	const { status, data, error, reload } = useGeoData(dataset);

	useEffect(() => {
		setSelected(null);
		setHovered(null);
	}, [dataset]);

	const focused = selected || hovered;
	const region = useMemo(() => (focused ? dataset.describe(focused) : null), [focused, dataset]);

	const datasetFacts = useMemo<RegionFact[]>(() => {
		if (!data) {
			return [];
		}

		const [minLon, minLat, maxLon, maxLat] = data.geoBounds;

		return [
			{ label: '区域数量', value: `${data.features.length} 个` },
			{ label: '投影方式', value: dataset.projectionLabel },
			{ label: '经度范围', value: `${minLon.toFixed(1)}° ~ ${maxLon.toFixed(1)}°` },
			{ label: '纬度范围', value: `${minLat.toFixed(1)}° ~ ${maxLat.toFixed(1)}°` }
		];
	}, [data, dataset]);

	const labelFor = useCallback((feature: MapFeature) => dataset.labelFor(feature), [dataset]);

	const tipFor = useCallback(
		(feature: MapFeature): MapTip => {
			const info = dataset.describe(feature);

			return { name: info.name, sub: info.sub };
		},
		[dataset]
	);

	const handleSelect = useCallback((feature: MapFeature | null) => setSelected(feature), []);
	const handleHover = useCallback((feature: MapFeature | null) => setHovered(feature), []);

	return (
		<div styleName="page">
			<Title title="Map" />
			<p styleName="lead">
				两张可交互的矢量地图：中国省级行政区与世界国家分布。都能拖动平移、滚轮缩放，点击区域查看信息。
			</p>

			<div styleName="tabs" role="tablist" aria-label="地图切换">
				{datasets.map(item => (
					<button
						key={item.id}
						type="button"
						role="tab"
						aria-selected={item.id === dataset.id}
						styleName={item.id === dataset.id ? 'tab active' : 'tab'}
						onClick={() => setDataset(item)}
					>
						<span styleName="tab-name">{item.tab}</span>
						<span styleName="tab-title">{item.title}</span>
					</button>
				))}
			</div>

			<div styleName="layout">
				<section styleName="stage">
					<GeoMap
						key={dataset.id}
						data={data}
						status={status}
						error={error}
						ariaLabel={`${dataset.title}交互地图`}
						hint="拖动平移 · 滚轮或双指缩放 · 双击放大 · 点击区域查看详情"
						graticule={dataset.graticule}
						standardParallel={dataset.standardParallel}
						minLabelArea={dataset.minLabelArea}
						labelSize={dataset.labelSize}
						selectedId={selected ? selected.id : null}
						labelFor={labelFor}
						tipFor={tipFor}
						onSelect={handleSelect}
						onHover={handleHover}
						onRetry={reload}
					/>
				</section>

				<aside styleName="panel">
					<section styleName="card">
						<p styleName="kicker">{region ? (selected ? '已选中' : '当前指向') : 'Dataset'}</p>
						<strong styleName="name">{region ? region.name : dataset.title}</strong>
						<p styleName="sub">{region ? region.sub : dataset.desc}</p>
						<dl styleName="facts">
							{(region ? region.facts : datasetFacts).map(fact => (
								<div styleName="fact" key={fact.label}>
									<dt>{fact.label}</dt>
									<dd>{fact.value}</dd>
								</div>
							))}
						</dl>
						{selected ? (
							<button type="button" styleName="clear" onClick={() => setSelected(null)}>
								取消选中
							</button>
						) : null}
					</section>

					<section styleName="card">
						<p styleName="kicker">操作</p>
						<ul styleName="tips">
							{mapTips.map(item => (
								<li key={item}>{item}</li>
							))}
						</ul>
						<p styleName="source">数据来源：{dataset.source}</p>
					</section>
				</aside>
			</div>
		</div>
	);
}
