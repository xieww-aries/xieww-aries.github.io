import React from 'react';
import { Link } from 'react-router-dom';

import Title from '../../../components/common/Title';
import { frontendNotes } from '../data';

import '../style.scss';

export default function SoftwareFrontend() {
	return (
		<div styleName="hub">
			<Link to="/software" styleName="back">
				← Software
			</Link>
			<Title title="Frontend" />
			<p styleName="lead">前端相关笔记，覆盖语言基础、构建工具、React 和面试题。</p>
			<ul styleName="grid">
				{frontendNotes.map(({ name, route, desc }) => (
					<li key={route}>
						<Link to={`/software/frontend/${route}`} styleName="card">
							<span styleName="kicker">{`/software/frontend/${route}`}</span>
							<strong styleName="name">{name}</strong>
							<p styleName="desc">{desc}</p>
							<span styleName="go">打开笔记 →</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
