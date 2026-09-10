import { useCallback, useEffect, useState } from 'react';

import { resolveStaticUrl } from '../../../utils/asset';
import { createProjector, MapData, prepareMap } from './geo';
import { MapDataset } from '../data';

export type MapStatus = 'loading' | 'ready' | 'error';

export interface GeoDataState {
	status: MapStatus;
	data: MapData | null;
	error: string | null;
}

const LOADING: GeoDataState = { status: 'loading', data: null, error: null };

const cache = new Map<string, MapData>();

function readCache(dataset: MapDataset): GeoDataState {
	const cached = cache.get(dataset.id);

	return cached ? { status: 'ready', data: cached, error: null } : LOADING;
}

/**
 * 拉取并预处理地图数据，按数据集缓存，切换标签不会重复请求
 *
 * @param {MapDataset} dataset 数据集配置
 * @return {GeoDataState & { reload: () => void }}
 */
export default function useGeoData(dataset: MapDataset) {
	const [state, setState] = useState<GeoDataState>(() => readCache(dataset));
	const [loadedId, setLoadedId] = useState(dataset.id);
	const [version, setVersion] = useState(0);

	// 数据集切换时在渲染阶段同步重置，避免子组件拿到上一份数据
	if (loadedId !== dataset.id) {
		setLoadedId(dataset.id);
		setState(readCache(dataset));
	}

	useEffect(() => {
		const cached = cache.get(dataset.id);

		if (cached) {
			setState({ status: 'ready', data: cached, error: null });

			return undefined;
		}

		const controller = new AbortController();

		setState(LOADING);

		fetch(resolveStaticUrl(dataset.file), { signal: controller.signal })
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP ${response.status}`);
				}

				return response.json();
			})
			.then(collection => {
				const prepared = prepareMap(collection, createProjector(dataset.standardParallel));

				cache.set(dataset.id, prepared);
				setState({ status: 'ready', data: prepared, error: null });
			})
			.catch(error => {
				if (error && error.name === 'AbortError') {
					return;
				}

				setState({
					status: 'error',
					data: null,
					error: error && error.message ? `地图数据加载失败（${error.message}）` : '地图数据加载失败'
				});
			});

		return () => controller.abort();
	}, [dataset, version]);

	const reload = useCallback(() => {
		cache.delete(dataset.id);
		setVersion(value => value + 1);
	}, [dataset]);

	return { status: state.status, data: state.data, error: state.error, reload };
}
