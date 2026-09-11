import React from 'react';

import './style.scss';

/**
 * 路由级懒加载的过渡态，避免切换页面时白屏
 *
 * @return {JSX.Element}
 */
export default function RouteFallback() {
	return (
		<div styleName="fallback" role="status" aria-live="polite">
			<span styleName="ring" />
			<span styleName="text">loading</span>
		</div>
	);
}
