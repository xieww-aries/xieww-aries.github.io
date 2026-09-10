import React, { useCallback, useEffect, useRef, useState } from 'react';

import DPad from '../shared/DPad';
import GameFrame from '../shared/GameFrame';
import { paintCell, setupCanvas } from '../shared/canvas';
import { readHighScore, writeHighScore } from '../shared/storage';
import {
	BOARD,
	CELL,
	COLS,
	HIGH_SCORE_KEY,
	ROWS,
	createSnakeState,
	enqueueDir,
	stepSnake,
	type Dir,
	type SnakeState
} from './engine';

function drawBoard(ctx: CanvasRenderingContext2D, state: SnakeState) {
	ctx.clearRect(0, 0, BOARD, BOARD);
	ctx.fillStyle = '#0c0e12';
	ctx.fillRect(0, 0, BOARD, BOARD);
	ctx.strokeStyle = 'rgba(242, 239, 232, 0.05)';
	ctx.lineWidth = 1;
	for (let i = 1; i < COLS; i += 1) {
		ctx.beginPath();
		ctx.moveTo(i * CELL + 0.5, 0);
		ctx.lineTo(i * CELL + 0.5, BOARD);
		ctx.stroke();
	}
	for (let i = 1; i < ROWS; i += 1) {
		ctx.beginPath();
		ctx.moveTo(0, i * CELL + 0.5);
		ctx.lineTo(BOARD, i * CELL + 0.5);
		ctx.stroke();
	}

	const pulse = 0.72 + Math.sin(performance.now() / 220) * 0.16;
	ctx.globalAlpha = pulse;
	paintCell(ctx, state.food.x * CELL, state.food.y * CELL, CELL, '#7eb8c9', 5);
	ctx.globalAlpha = 1;

	state.snake.forEach((part, index) => {
		const color = index === 0 ? '#e8c07a' : '#d4a054';
		paintCell(ctx, part.x * CELL, part.y * CELL, CELL, color, 3);
	});

	const head = state.snake[0];
	if (head) {
		ctx.fillStyle = '#1a140c';
		const eye = 3;
		const offset = {
			up: [
				[7, 7],
				[14, 7]
			],
			down: [
				[7, 15],
				[14, 15]
			],
			left: [
				[7, 7],
				[7, 14]
			],
			right: [
				[15, 7],
				[15, 14]
			]
		}[state.dir];
		offset.forEach(([ox, oy]) => {
			ctx.beginPath();
			ctx.arc(head.x * CELL + ox, head.y * CELL + oy, eye, 0, Math.PI * 2);
			ctx.fill();
		});
	}
}

function codeToDir(code: string): Dir | null {
	if (code === 'ArrowUp' || code === 'KeyW') return 'up';
	if (code === 'ArrowDown' || code === 'KeyS') return 'down';
	if (code === 'ArrowLeft' || code === 'KeyA') return 'left';
	if (code === 'ArrowRight' || code === 'KeyD') return 'right';
	return null;
}

export default function Snake() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const stateRef = useRef<SnakeState>(createSnakeState());
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(() => readHighScore(HIGH_SCORE_KEY));
	const [status, setStatus] = useState<SnakeState['status']>('idle');

	const syncView = useCallback(() => {
		const state = stateRef.current;
		setScore(state.score);
		setStatus(state.status);
		if (state.status === 'over') {
			setHighScore(writeHighScore(HIGH_SCORE_KEY, state.score));
		}
	}, []);

	const paint = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}
		drawBoard(ctx, stateRef.current);
	}, []);

	const start = useCallback(() => {
		if (stateRef.current.status === 'over') {
			stateRef.current = createSnakeState();
		}
		stateRef.current.status = 'running';
		syncView();
	}, [syncView]);

	const pause = useCallback(() => {
		if (stateRef.current.status === 'running') {
			stateRef.current.status = 'paused';
			syncView();
		}
	}, [syncView]);

	const resume = useCallback(() => {
		if (stateRef.current.status === 'paused') {
			stateRef.current.status = 'running';
			syncView();
		}
	}, [syncView]);

	const restart = useCallback(() => {
		stateRef.current = createSnakeState();
		stateRef.current.status = 'running';
		syncView();
	}, [syncView]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}
		setupCanvas(canvas, BOARD, BOARD);
		paint();
	}, [paint]);

	useEffect(() => {
		if (status !== 'running') {
			paint();
			return;
		}
		let raf = 0;
		let last = performance.now();
		const loop = (now: number) => {
			raf = requestAnimationFrame(loop);
			const state = stateRef.current;
			if (now - last >= state.tickMs) {
				last = now;
				stepSnake(state);
				syncView();
			}
			paint();
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [paint, status, syncView]);

	useEffect(() => {
		const onKey = (event: KeyboardEvent) => {
			const dir = codeToDir(event.code);
			if (dir || event.code === 'Space' || event.code === 'KeyP' || event.code === 'Escape') {
				event.preventDefault();
			}
			const state = stateRef.current;
			if (dir) {
				if (state.status === 'idle') {
					start();
				}
				enqueueDir(state, dir);
				return;
			}
			if (event.code === 'Space') {
				if (state.status === 'running') pause();
				else if (state.status === 'paused') resume();
				else start();
				return;
			}
			if (event.code === 'KeyP' || event.code === 'Escape') {
				if (state.status === 'running') pause();
				else if (state.status === 'paused') resume();
			}
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [pause, resume, start]);

	useEffect(() => {
		const onHide = () => {
			if (document.hidden) {
				pause();
			}
		};
		document.addEventListener('visibilitychange', onHide);
		return () => document.removeEventListener('visibilitychange', onHide);
	}, [pause]);

	const pressDir = (dir: Dir) => {
		if (stateRef.current.status === 'idle') {
			start();
		}
		enqueueDir(stateRef.current, dir);
	};

	return (
		<GameFrame
			title="贪吃蛇"
			kicker="Snake"
			stats={[
				{ label: '得分', value: score },
				{ label: '最高', value: highScore }
			]}
			status={status}
			boardMaxWidth={BOARD}
			onStart={start}
			onPause={pause}
			onResume={resume}
			onRestart={restart}
			hints={[
				'方向键或 WASD 转向',
				'空格开始 / 暂停',
				'吃到食物 +10，速度会逐渐加快',
				'撞墙或咬到自己即结束'
			]}
			pad={<DPad onDir={pressDir} />}
		>
			<canvas ref={canvasRef} width={BOARD} height={BOARD} role="img" aria-label="贪吃蛇棋盘" />
		</GameFrame>
	);
}
