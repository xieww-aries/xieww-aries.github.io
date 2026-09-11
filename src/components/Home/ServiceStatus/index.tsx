import React, { useEffect, useState } from 'react';

import { fetchServiceInfo, ServiceInfo } from '../../../utils/api';

import './style.scss';

/**
 * 首页的运行态徽标：只有当页面由 service 托管（/api 可用）时才渲染，
 * 部署在 GitHub Pages 上时自动隐藏，不影响静态站点观感。
 */
export default function ServiceStatus() {
	const [info, setInfo] = useState<ServiceInfo | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		fetchServiceInfo(controller.signal).then(result => {
			if (result) {
				setInfo(result);
			}
		});

		return () => controller.abort();
	}, []);

	if (!info) {
		return null;
	}

	return (
		<p styleName="status">
			<span styleName="dot"></span>
			<span styleName="label">service online</span>
			<span styleName="meta">{`v${info.version} · node ${info.node.replace(/^v/, '')}`}</span>
		</p>
	);
}
