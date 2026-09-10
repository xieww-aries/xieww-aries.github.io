import React from 'react';
import { Link } from 'react-router-dom';

import Title from '../../components/common/Title';
import { softwareSections } from './data';

import './style.scss';

export default function Software() {
	return (
		<div styleName="hub">
			<Title title="Software" />
			<p styleName="lead">按方向整理的技术笔记，目前分成前端与后端两块。</p>
			<ul styleName="grid">
				{softwareSections.map(({ name, route, desc }) => (
					<li key={route}>
						<Link to={`/software/${route}`} styleName="card">
							<span styleName="kicker">{`/software/${route}`}</span>
							<strong styleName="name">{name}</strong>
							<p styleName="desc">{desc}</p>
							<span styleName="go">查看笔记 →</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
