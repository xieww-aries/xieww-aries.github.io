import React, { useCallback, useEffect, useRef, useState } from 'react';

import DPad, { type Dir } from '../shared/DPad';
import GameFrame from '../shared/GameFrame';
import { paintCell, setupCanvas } from '../shared/canvas';
import { readHighScore, writeHighScore } from '../shared/storage';
import {
	BOARD_H,
	BOARD_W,
	CELL,
	COLS,
	HIGH_SCORE_KEY,
	PAD,
	PIECE_COLORS,
	ROWS,
	cellsOf,
	createTetrisState,
	ghostPiece,
	hardDrop,
	movePiece,
	previewCells,
	rotatePiece,
	softDrop,
	startTetris,
	tickTetris,
	type TetrisState
} from './engine';

import './style.scss';

const PREVIEW = 120;

function drawBoard(ctx: CanvasRenderingContext2D, state: TetrisState) {
	ctx.clearRect(0, 0, BOARD_W, BOARD_H);
	ctx.fillStyle = '#0c0e12';
	ctx.fillRect(0, 0, BOARD_W, BOARD_H);

	ctx.strokeStyle = 'rgba(242, 239, 232, 0.06)';
	ctx.lineWidth = 1;
	for (let x = 0; x <= COLS; x += 1) {
		ctx.beginPath();
		ctx.moveTo(PAD + x * CELL + 0.5, PAD);
		ctx.lineTo(PAD + x * CELL + 0.5, PAD + ROWS * CELL);
		ctx.stroke();
	}
	for (let y = 0; y <= ROWS; y += 1) {
		ctx.beginPath();
		ctx.moveTo(PAD, PAD + y * CELL + 0.5);
		ctx.lineTo(PAD + COLS * CELL, PAD + y * CELL + 0.5);
		ctx.stroke();
	}

	state.board.forEach((row, y) => {
		row.forEach((cell, x) => {
			if (!cell) return;
			paintCell(ctx, PAD + x * CELL, PAD + y * CELL, CELL, PIECE_COLORS[cell], 3);
		});
	});

	const ghost = ghostPiece(state);
	if (ghost && state.current) {
		ctx.globalAlpha = 0.22;
		cellsOf(ghost).forEach(({ x, y }) => {
			if (y < 0) return;
			paintCell(ctx, PAD + x * CELL, PAD + y * CELL, CELL, PIECE_COLORS[ghost.id], 3);
		});
		ctx.globalAlpha = 1;
	}

	if (state.current) {
		const piece = state.current;
		cellsOf(piece).forEach(({ x, y }) => {
			if (y < 0) return;
			paintCell(ctx, PAD + x * CELL, PAD + y * CELL, CELL, PIECE_COLORS[piece.id], 3);
		});
	}
}

function drawPreview(ctx: CanvasRenderingContext2D, state: TetrisState) {
	ctx.clearRect(0, 0, PREVIEW, PREVIEW);
	ctx.fillStyle = '#0c0e12';
	ctx.fillRect(0, 0, PREVIEW, PREVIEW);
	const cells = previewCells(state.next);
	const size = 22;
	const minX = Math.min(...cells.map(cell => cell.x));
	const maxX = Math.max(...cells.map(cell => cell.x));
	const minY = Math.min(...cells.map(cell => cell.y));
	const maxY = Math.max(...cells.map(cell => cell.y));
	const width = (maxX - minX + 1) * size;
	const height = (maxY - minY + 1) * size;
	const ox = (PREVIEW - width) / 2 - minX * size;
	const oy = (PREVIEW - height) / 2 - minY * size;
	cells.forEach(cell => {
		paintCell(ctx, ox + cell.x * size, oy + cell.y * size, size, PIECE_COLORS[state.next], 3);
	});
}

export default function Tetris() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const previewRef = useRef<HTMLCanvasElement>(null);
	const stateRef = useRef<TetrisState>(createTetrisState());
	const heldRef = useRef({ left: false, right: false, down: false });
	const dasRef = useRef({ nextAt: 0, dropAt: 0 });
	const hudKeyRef = useRef('');
	const [view, setView] = useState({
		score: 0,
		lines: 0,
		level: 1,
		highScore: readHighScore(HIGH_SCORE_KEY),
		status: 'idle' as TetrisState['status']
	});

	const syncView = useCallback(() => {
		const state = stateRef.current;
		const highScore =
			state.status === 'over' ? writeHighScore(HIGH_SCORE_KEY, state.score) : readHighScore(HIGH_SCORE_KEY);
		setView({
			score: state.score,
			lines: state.lines,
			level: state.level,
			highScore,
			status: state.status
		});
	}, []);

	const paint = useCallback(() => {
		const board = canvasRef.current?.getContext('2d');
		const preview = previewRef.current?.getContext('2d');
		if (board) {
			drawBoard(board, stateRef.current);
		}
		if (preview) {
			drawPreview(preview, stateRef.current);
		}
	}, []);

	const start = useCallback(() => {
		if (stateRef.current.status === 'over' || stateRef.current.status === 'idle') {
			if (stateRef.current.status === 'over') {
				stateRef.current = createTetrisState();
			}
			startTetris(stateRef.current, performance.now());
			syncView();
			paint();
		}
	}, [paint, syncView]);

	const pause = useCallback(() => {
		if (stateRef.current.status === 'running') {
			stateRef.current.status = 'paused';
			heldRef.current = { left: false, right: false, down: false };
			syncView();
		}
	}, [syncView]);

	const resume = useCallback(() => {
		if (stateRef.current.status === 'paused') {
			stateRef.current.lastGravity = performance.now();
			stateRef.current.status = 'running';
			syncView();
		}
	}, [syncView]);

	const restart = useCallback(() => {
		stateRef.current = createTetrisState();
		startTetris(stateRef.current, performance.now());
		heldRef.current = { left: false, right: false, down: false };
		syncView();
		paint();
	}, [paint, syncView]);

	useEffect(() => {
		if (canvasRef.current) {
			setupCanvas(canvasRef.current, BOARD_W, BOARD_H);
		}
		if (previewRef.current) {
			setupCanvas(previewRef.current, PREVIEW, PREVIEW);
		}
		paint();
	}, [paint]);

	useEffect(() => {
		if (view.status !== 'running') {
			paint();
			return undefined;
		}
		let raf = 0;
		const loop = (now: number) => {
			raf = requestAnimationFrame(loop);
			const state = stateRef.current;
			const held = heldRef.current;
			const das = dasRef.current;
			const dir = (held.left ? -1 : 0) + (held.right ? 1 : 0);
			if (dir !== 0 && now >= das.nextAt) {
				movePiece(state, dir, now);
				das.nextAt = now + 50;
			}
			if (held.down && now >= das.dropAt) {
				softDrop(state, now);
				das.dropAt = now + 50;
			}
			tickTetris(state, now);
			const hudKey = `${state.status}:${state.score}:${state.lines}:${state.level}`;
			if (hudKey !== hudKeyRef.current) {
				hudKeyRef.current = hudKey;
				syncView();
			}
			paint();
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [paint, syncView, view.status]);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			const { code } = event;
			const block = [
				'ArrowUp',
				'ArrowDown',
				'ArrowLeft',
				'ArrowRight',
				'Space',
				'KeyW',
				'KeyA',
				'KeyS',
				'KeyD',
				'KeyX',
				'KeyP',
				'Escape'
			];
			if (block.includes(code)) {
				event.preventDefault();
			}
			const state = stateRef.current;
			const now = performance.now();
			if (code === 'Space') {
				if (state.status === 'running') {
					hardDrop(state);
					syncView();
					paint();
				} else if (state.status === 'paused') {
					resume();
				} else {
					start();
				}
				return;
			}
			if (code === 'KeyP' || code === 'Escape') {
				if (state.status === 'running') pause();
				else if (state.status === 'paused') resume();
				return;
			}
			if (
				state.status === 'idle' &&
				['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', 'KeyA', 'KeyD', 'KeyS', 'KeyW'].includes(code)
			) {
				start();
			}
			if (event.repeat) {
				return;
			}
			if (code === 'ArrowLeft' || code === 'KeyA') {
				heldRef.current.left = true;
				dasRef.current.nextAt = now + 160;
				movePiece(state, -1, now);
				paint();
				return;
			}
			if (code === 'ArrowRight' || code === 'KeyD') {
				heldRef.current.right = true;
				dasRef.current.nextAt = now + 160;
				movePiece(state, 1, now);
				paint();
				return;
			}
			if (code === 'ArrowDown' || code === 'KeyS') {
				heldRef.current.down = true;
				dasRef.current.dropAt = now + 70;
				softDrop(state, now);
				syncView();
				paint();
				return;
			}
			if (code === 'ArrowUp' || code === 'KeyW' || code === 'KeyX') {
				rotatePiece(state, now);
				paint();
			}
		};
		const onKeyUp = (event: KeyboardEvent) => {
			if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
				heldRef.current.left = false;
			}
			if (event.code === 'ArrowRight' || event.code === 'KeyD') {
				heldRef.current.right = false;
			}
			if (event.code === 'ArrowDown' || event.code === 'KeyS') {
				heldRef.current.down = false;
			}
		};
		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('keyup', onKeyUp);
		};
	}, [paint, pause, resume, start, syncView]);

	useEffect(() => {
		const onHide = () => {
			if (document.hidden) {
				pause();
			}
		};
		document.addEventListener('visibilitychange', onHide);
		return () => document.removeEventListener('visibilitychange', onHide);
	}, [pause]);

	const onDir = (dir: Dir) => {
		const state = stateRef.current;
		const now = performance.now();
		if (state.status === 'idle') {
			start();
		}
		if (dir === 'left') {
			movePiece(state, -1, now);
		} else if (dir === 'right') {
			movePiece(state, 1, now);
		} else if (dir === 'down') {
			softDrop(state, now);
			syncView();
		} else {
			rotatePiece(state, now);
		}
		paint();
	};

	return (
		<GameFrame
			title="俄罗斯方块"
			kicker="Tetris"
			stats={[
				{ label: '得分', value: view.score },
				{ label: '最高', value: view.highScore },
				{ label: '消行', value: view.lines },
				{ label: '等级', value: view.level }
			]}
			status={view.status}
			boardMaxWidth={BOARD_W}
			onStart={start}
			onPause={pause}
			onResume={resume}
			onRestart={restart}
			hints={[
				'← → 移动，↑ / W 旋转',
				'↓ 软降，空格硬降落地',
				'P 或 Esc 暂停',
				'消行会升级，下落会变快'
			]}
			sideExtra={
				<div styleName="preview">
					<p>下一个</p>
					<canvas ref={previewRef} width={PREVIEW} height={PREVIEW} role="img" aria-label="下一个方块" />
				</div>
			}
			pad={
				<DPad
					onDir={onDir}
					actions={[
						{
							label: '旋转',
							ariaLabel: '旋转',
							onPress: () => {
								if (stateRef.current.status === 'idle') {
									start();
								}
								rotatePiece(stateRef.current, performance.now());
								paint();
							}
						},
						{
							label: '落地',
							ariaLabel: '硬降',
							onPress: () => {
								if (stateRef.current.status === 'idle') {
									start();
									return;
								}
								hardDrop(stateRef.current);
								syncView();
								paint();
							}
						}
					]}
				/>
			}
		>
			<canvas ref={canvasRef} width={BOARD_W} height={BOARD_H} role="img" aria-label="俄罗斯方块棋盘" />
		</GameFrame>
	);
}
