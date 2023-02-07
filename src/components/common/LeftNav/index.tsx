import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

export default function LeftNav(props) {
	const { data, firstRouter, handleSelectItem, activeIndex } = props;

	return (
		<ul styleName="doc-nav">
			{
				data.map((item, index: number) => (
					<li
						key={item.title}
						onClick={() => handleSelectItem(index)}
						styleName={`nav-item ${activeIndex === index ? 'active' : ''}`}
					>
						<Link to={`/${firstRouter}/${item.router}`}>
							{item.title}
						</Link>
						<span styleName="item-arrow" className="iconfont icon-arrow-right"></span>
					</li>
				))
			}
		</ul>
	);
}
