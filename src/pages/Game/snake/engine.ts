export type Dir = 'up' | 'down' | 'left' | 'right';
export type Point = { x: number; y: number };
export type GameStatus = 'idle' | 'running' | 'paused' | 'over';

export const COLS = 20;
export const ROWS = 20;
export const CELL = 24;
export const BOARD = COLS * CELL;
export const HIGH_SCORE_KEY = 'aries.game.snake';

const DELTA: Record<Dir, Point> = {
	up: { x: 0, y: -1 },
	down: { x: 0, y: 1 },
	left: { x: -1, y: 0 },
	right: { x: 1, y: 0 }
};

const OPPOSITE: Record<Dir, Dir> = {
	up: 'down',
	down: 'up',
	left: 'right',
	right: 'left'
};

export interface SnakeState {
	snake: Point[];
	dir: Dir;
	queue: Dir[];
	food: Point;
	score: number;
	status: GameStatus;
	tickMs: number;
}

function same(a: Point, b: Point) {
	return a.x === b.x && a.y === b.y;
}

function randomFood(snake: Point[]): Point {
	const taken = new Set(snake.map(part => `${part.x},${part.y}`));
	const empty: Point[] = [];
	for (let y = 0; y < ROWS; y += 1) {
		for (let x = 0; x < COLS; x += 1) {
			if (!taken.has(`${x},${y}`)) {
				empty.push({ x, y });
			}
		}
	}
	if (!empty.length) {
		return snake[0];
	}
	return empty[Math.floor(Math.random() * empty.length)];
}

export function createSnakeState(): SnakeState {
	const snake = [
		{ x: 8, y: 10 },
		{ x: 7, y: 10 },
		{ x: 6, y: 10 }
	];
	return {
		snake,
		dir: 'right',
		queue: [],
		food: randomFood(snake),
		score: 0,
		status: 'idle',
		tickMs: 150
	};
}

export function enqueueDir(state: SnakeState, dir: Dir) {
	if (state.status !== 'running') {
		return;
	}
	const last = state.queue[state.queue.length - 1] ?? state.dir;
	if (dir === last || dir === OPPOSITE[last]) {
		return;
	}
	if (state.queue.length >= 2) {
		return;
	}
	state.queue.push(dir);
}

export function stepSnake(state: SnakeState) {
	if (state.status !== 'running') {
		return;
	}
	if (state.queue.length) {
		state.dir = state.queue.shift() as Dir;
	}
	const head = state.snake[0];
	const delta = DELTA[state.dir];
	const next = { x: head.x + delta.x, y: head.y + delta.y };
	const hitWall = next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS;
	const growing = same(next, state.food);
	const body = growing ? state.snake : state.snake.slice(0, -1);
	const hitSelf = body.some(part => same(part, next));
	if (hitWall || hitSelf) {
		state.status = 'over';
		return;
	}
	state.snake = [next, ...state.snake];
	if (growing) {
		state.score += 10;
		state.tickMs = Math.max(70, 150 - Math.floor(state.score / 10) * 4);
		state.food = randomFood(state.snake);
	} else {
		state.snake.pop();
	}
}
