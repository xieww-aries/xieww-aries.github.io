import React from 'react';

import Title from '../../components/common/Title';
import './style.scss';

export default function Game() {
	return (
		<div styleName="game-page">
			<Title title="Game" />
			<div styleName="game-box">
				<strong>实验场还是空的</strong>
				<p>这里以后会放一点小游戏和交互实验。</p>
			</div>
		</div>
	);
}
