import React, { useState } from 'react';

import './style.scss';
import { listData } from './mockData';

import Title from '../../components/common/Title';

export default function List() {
	const [movieList] = useState([...listData]);
	const goToDetail = (url: string) => (location.href = url);
	return (
		<div>
			<Title title="电影列表" />
			<ul styleName="movie-box">
				{movieList.length > 0 &&
                    movieList.map((item) => (
                    	<li key={item.id} onClick={goToDetail.bind(this, item.url)}>
                    		<img src={item.cover} />
                    		<p>电影名称：{item.title}</p>
                    		<p>电影评分：{item.rate}</p>
                    	</li>
                    ))}
			</ul>
		</div>
	);
}
