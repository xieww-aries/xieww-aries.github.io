import React from 'react';
import { Link } from 'react-router-dom';

import './GameFrame.scss';

export type GameStatus = 'idle' | 'running' | 'paused' | 'over';

interface Stat {
	label: string;
	value: React.ReactNode;
}

interface Props {
	title: string;
	kicker: string;
	stats: Stat[];
	status: GameStatus;
	onStart: () => void;
	onPause: () => void;
	onResume: () => void;
	onRestart: () => void;
	hints: string[];
	sideExtra?: React.ReactNode;
	pad?: React.ReactNode;
	boardMaxWidth?: number;
	children: React.ReactNode;
}

const overlayCopy: Record<GameStatus, { title: string; hint: string } | null> = {
	idle: { title: '准备开始', hint: '按空格或点开始' },
	paused: { title: '已暂停', hint: '按空格继续' },
	over: { title: '游戏结束', hint: '按空格再来一局' },
	running: null
};

export default function GameFrame({
	title,
	kicker,
	stats,
	status,
	onStart,
	onPause,
	onResume,
	onRestart,
	hints,
	sideExtra,
	pad,
	boardMaxWidth = 480,
	children
}: Props) {
	const overlay = overlayCopy[status];
	const primary =
		status === 'running'
			? { label: '暂停', action: onPause }
			: status === 'paused'
				? { label: '继续', action: onResume }
				: status === 'over'
					? { label: '再来一局', action: onRestart }
					: { label: '开始', action: onStart };

	return (
		<div styleName="frame">
			<Link to="/game" styleName="back">
				← 返回游戏大厅
			</Link>
			<div styleName="head">
				<p styleName="kicker">{kicker}</p>
				<h1 styleName="title">{title}</h1>
			</div>
			<div styleName="layout">
				<div styleName="stage">
					<div styleName="board" style={{ maxWidth: boardMaxWidth }}>
						{children}
						{overlay ? (
							<button type="button" styleName="overlay" onClick={primary.action}>
								<strong>{overlay.title}</strong>
								<span>{overlay.hint}</span>
							</button>
						) : null}
					</div>
				</div>
				<aside styleName="side">
					<ul styleName="stats">
						{stats.map(item => (
							<li key={item.label}>
								<span>{item.label}</span>
								<strong>{item.value}</strong>
							</li>
						))}
					</ul>
					{sideExtra}
					<div styleName="actions">
						<button type="button" styleName="primary" onClick={primary.action}>
							{primary.label}
						</button>
						{status !== 'idle' ? (
							<button type="button" styleName="ghost" onClick={onRestart}>
								重开
							</button>
						) : null}
					</div>
					<ul styleName="hints">
						{hints.map(hint => (
							<li key={hint}>{hint}</li>
						))}
					</ul>
				</aside>
			</div>
			{pad ? <div styleName="pad">{pad}</div> : null}
		</div>
	);
}
