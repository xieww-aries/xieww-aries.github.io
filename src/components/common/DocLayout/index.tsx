import React, { ComponentType, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import LeftNav, { DocNavItem } from '../LeftNav';
import Title from '../Title';

import './style.scss';

interface Props {
	navData: DocNavItem[];
	firstRouter: string;
	sections: ComponentType[];
	titleFor?: (item: DocNavItem) => string;
}

/**
 * 按路径段定位当前笔记，未命中时回到第一篇
 *
 * @param {string} pathname 当前路径
 * @param {DocNavItem[]} navData 左侧导航数据
 * @return {number}
 */
function resolveActiveIndex(pathname: string, navData: DocNavItem[]) {
	const segments = pathname.split('/').filter(Boolean);
	const matched = navData.findIndex(item => segments.includes(item.router));

	return matched > 0 ? matched : 0;
}

/**
 * 笔记页通用骨架：左侧导航 + 右侧正文，导航状态完全由 url 驱动
 *
 * @param {Props} props 见 Props
 * @return {JSX.Element}
 */
export default function DocLayout({ navData, firstRouter, sections, titleFor }: Props) {
	const { pathname } = useLocation();
	const activeIndex = useMemo(() => resolveActiveIndex(pathname, navData), [pathname, navData]);
	const Section = sections[activeIndex] || sections[0];
	const title = titleFor ? titleFor(navData[activeIndex]) : '';

	return (
		<div styleName="doc">
			<LeftNav data={navData} firstRouter={firstRouter} activeIndex={activeIndex} />
			<div styleName="doc-main">
				{title ? <Title title={title} /> : null}
				<Section />
			</div>
		</div>
	);
}
