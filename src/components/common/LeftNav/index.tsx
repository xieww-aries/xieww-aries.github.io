import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

export default function LeftNav(props) {
	const { data, firstRouter, handleSelectItem, activeIndex } = props;

	return (
		<nav styleName="doc-nav">
			<p styleName="nav-label">Contents</p>
			<ul>
				{data.map((item, index: number) => (
					<li
						key={item.title}
						onClick={() => handleSelectItem(index)}
						styleName={activeIndex === index ? 'nav-item active' : 'nav-item'}
					>
						<Link to={`/${firstRouter}/${item.router}`}>{item.title}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
