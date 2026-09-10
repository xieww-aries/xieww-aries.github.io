import React from 'react';
import { Link } from 'react-router-dom';

import { headerData } from '../../components/common/Header/headerData';
import Animation from '../../components/Home/3DAnimation';

import './style.scss';

export default function Home() {
	const cards = headerData.filter(item => item.route !== 'index');

	return (
		<div styleName="home">
			<section styleName="hero">
				<div styleName="copy">
					<p styleName="eyebrow">Personal Knowledge Base</p>
					<h1 styleName="title">Aries 的前端笔记本</h1>
					<p styleName="lead">
						把 JavaScript、Webpack、React 和面试题整理成一份随时可翻的笔记，顺手收藏电影，也留一块实验场。
					</p>
				</div>
				<div styleName="visual">
					<Animation />
					<p styleName="visual-hint">Hover the cube</p>
				</div>
			</section>

			<section styleName="catalog">
				<div styleName="section-head">
					<p styleName="eyebrow">Index</p>
					<h2 styleName="section-title">笔记目录</h2>
				</div>
				<ul styleName="grid">
					{cards.map(({ name, route, desc }) => (
						<li key={route}>
							<Link to={`/${route}`} styleName="card">
								<span styleName="card-kicker">{`/${route}`}</span>
								<strong styleName="card-title">{name}</strong>
								<p styleName="card-desc">{desc}</p>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}
