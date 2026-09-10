import React from 'react';
import { Link } from 'react-router-dom';

import Title from '../../components/common/Title';
import './style.scss';

const games = [
	{
		to: '/game/snake',
		kicker: 'Snake',
		title: '贪吃蛇',
		desc: '在格子里穿行，吃到食物就会变长。撞墙或咬到自己就结束。',
		kind: 'snake'
	},
	{
		to: '/game/tetris',
		kicker: 'Tetris',
		title: '俄罗斯方块',
		desc: '七种方块依次落下，消掉整行得分。等级越高，下落越快。',
		kind: 'tetris'
	}
];

export default function Game() {
	return (
		<div styleName="game-page">
			<Title title="Game" />
			<p styleName="lead">两款用键盘就能玩的小游戏，最高分会记在这台浏览器里。</p>
			<ul styleName="grid">
				{games.map(game => (
					<li key={game.to}>
						<Link to={game.to} styleName="card">
							<div styleName="preview">
								{game.kind === 'snake' ? (
									<>
										<span styleName="seg s1" />
										<span styleName="seg s2" />
										<span styleName="seg s3" />
										<span styleName="seg s4" />
										<span styleName="food" />
									</>
								) : (
									<>
										<span styleName="block b1" />
										<span styleName="block b2" />
										<span styleName="block b3" />
										<span styleName="block b4" />
									</>
								)}
							</div>
							<span styleName="kicker">{game.kicker}</span>
							<strong styleName="name">{game.title}</strong>
							<p styleName="desc">{game.desc}</p>
							<span styleName="go">开始玩 →</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
