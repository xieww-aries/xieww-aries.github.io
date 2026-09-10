import React, { useState } from 'react';

import './style.scss';
import { listData } from './mockData';

import Title from '../../components/common/Title';

export default function List() {
	const [movieList] = useState([...listData]);
	const goToDetail = (url: string) => {
		window.open(url, '_blank', 'noopener,noreferrer');
	};

	return (
		<div styleName="list-page">
			<Title title="电影列表" />
			<ul styleName="movie-box">
				{movieList.length > 0 &&
					movieList.map(item => (
						<li key={item.id} onClick={() => goToDetail(item.url)} styleName="movie-card">
							<div styleName="poster">
								<img src={item.cover} alt="" />
								<span styleName="rate">{item.rate}</span>
							</div>
							<p styleName="movie-title">{item.title}</p>
						</li>
					))}
			</ul>
		</div>
	);
}
