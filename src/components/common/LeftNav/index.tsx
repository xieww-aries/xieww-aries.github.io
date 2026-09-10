import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

export interface DocNavItem {
	title: string;
	router: string;
}

interface Props {
	data: DocNavItem[];
	firstRouter: string;
	activeIndex: number;
}

export default function LeftNav({ data, firstRouter, activeIndex }: Props) {
	return (
		<nav styleName="doc-nav">
			<p styleName="nav-label">Contents</p>
			<ul>
				{data.map((item, index) => (
					<li key={item.title} styleName={activeIndex === index ? 'nav-item active' : 'nav-item'}>
						<Link to={`/${firstRouter}/${item.router}`}>{item.title}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
