export type PieceId = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';
export type Cell = PieceId | null;
export type GameStatus = 'idle' | 'running' | 'paused' | 'over';

export const COLS = 10;
export const ROWS = 20;
export const CELL = 28;
export const PAD = 8;
export const BOARD_W = COLS * CELL + PAD * 2;
export const BOARD_H = ROWS * CELL + PAD * 2;
export const HIGH_SCORE_KEY = 'aries.game.tetris';
export const LOCK_MS = 450;

export const PIECE_COLORS: Record<PieceId, string> = {
	I: '#7eb8c9',
	O: '#d4a054',
	T: '#c4a0d8',
	S: '#8fba7a',
	Z: '#d47a6a',
	J: '#6a90d4',
	L: '#e08a4a'
};

type Point = { x: number; y: number };

const SHAPES: Record<PieceId, Point[][]> = {
	I: [
		[
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 },
			{ x: 3, y: 1 }
		],
		[
			{ x: 2, y: 0 },
			{ x: 2, y: 1 },
			{ x: 2, y: 2 },
			{ x: 2, y: 3 }
		],
		[
			{ x: 0, y: 2 },
			{ x: 1, y: 2 },
			{ x: 2, y: 2 },
			{ x: 3, y: 2 }
		],
		[
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
			{ x: 1, y: 2 },
			{ x: 1, y: 3 }
		]
	],
	O: [
		[
			{ x: 1, y: 0 },
			{ x: 2, y: 0 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 }
		],
		[
			{ x: 1, y: 0 },
			{ x: 2, y: 0 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 }
		],
		[
			{ x: 1, y: 0 },
			{ x: 2, y: 0 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 }
		],
		[
			{ x: 1, y: 0 },
			{ x: 2, y: 0 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 }
		]
	],
	T: [
		[
			{ x: 1, y: 0 },
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 }
		],
		[
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 },
			{ x: 1, y: 2 }
		],
		[
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 },
			{ x: 1, y: 2 }
		],
		[
			{ x: 1, y: 0 },
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 1, y: 2 }
		]
	],
	S: [
		[
			{ x: 1, y: 0 },
			{ x: 2, y: 0 },
			{ x: 0, y: 1 },
			{ x: 1, y: 1 }
		],
		[
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 },
			{ x: 2, y: 2 }
		],
		[
			{ x: 1, y: 1 },
			{ x: 2, y: 1 },
			{ x: 0, y: 2 },
			{ x: 1, y: 2 }
		],
		[
			{ x: 0, y: 0 },
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 1, y: 2 }
		]
	],
	Z: [
		[
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 }
		],
		[
			{ x: 2, y: 0 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 },
			{ x: 1, y: 2 }
		],
		[
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 1, y: 2 },
			{ x: 2, y: 2 }
		],
		[
			{ x: 1, y: 0 },
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 0, y: 2 }
		]
	],
	J: [
		[
			{ x: 0, y: 0 },
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 }
		],
		[
			{ x: 1, y: 0 },
			{ x: 2, y: 0 },
			{ x: 1, y: 1 },
			{ x: 1, y: 2 }
		],
		[
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 },
			{ x: 2, y: 2 }
		],
		[
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
			{ x: 0, y: 2 },
			{ x: 1, y: 2 }
		]
	],
	L: [
		[
			{ x: 2, y: 0 },
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 }
		],
		[
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
			{ x: 1, y: 2 },
			{ x: 2, y: 2 }
		],
		[
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 },
			{ x: 0, y: 2 }
		],
		[
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
			{ x: 1, y: 2 }
		]
	]
};

const BAG: PieceId[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
const KICKS = [
	{ x: 0, y: 0 },
	{ x: -1, y: 0 },
	{ x: 1, y: 0 },
	{ x: 0, y: -1 },
	{ x: -2, y: 0 },
	{ x: 2, y: 0 }
];

export interface Active {
	id: PieceId;
	rot: number;
	x: number;
	y: number;
}

export interface TetrisState {
	board: Cell[][];
	current: Active | null;
	next: PieceId;
	bag: PieceId[];
	score: number;
	lines: number;
	level: number;
	status: GameStatus;
	gravityMs: number;
	lastGravity: number;
	lockAt: number | null;
}

function shuffle(list: PieceId[]): PieceId[] {
	const next = [...list];
	for (let i = next.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[next[i], next[j]] = [next[j], next[i]];
	}
	return next;
}

function emptyBoard(): Cell[][] {
	return Array.from({ length: ROWS }, () => Array<Cell>(COLS).fill(null));
}

function takePiece(state: TetrisState): PieceId {
	if (!state.bag.length) {
		state.bag = shuffle(BAG);
	}
	return state.bag.pop() as PieceId;
}

export function cellsOf(piece: Active): Point[] {
	return SHAPES[piece.id][piece.rot].map(cell => ({
		x: piece.x + cell.x,
		y: piece.y + cell.y
	}));
}

export function previewCells(id: PieceId): Point[] {
	return SHAPES[id][0];
}

function collides(board: Cell[][], piece: Active) {
	return cellsOf(piece).some(({ x, y }) => {
		if (x < 0 || x >= COLS || y >= ROWS) {
			return true;
		}
		if (y < 0) {
			return false;
		}
		return board[y][x] !== null;
	});
}

function onGround(state: TetrisState) {
	if (!state.current) {
		return false;
	}
	return collides(state.board, { ...state.current, y: state.current.y + 1 });
}

function gravityFor(level: number) {
	return Math.max(90, 800 - (level - 1) * 70);
}

function spawn(state: TetrisState) {
	const id = state.next;
	state.next = takePiece(state);
	const current: Active = { id, rot: 0, x: 3, y: 0 };
	if (collides(state.board, current)) {
		state.current = current;
		state.status = 'over';
		return;
	}
	state.current = current;
	state.lockAt = null;
}

function clearLines(state: TetrisState) {
	let cleared = 0;
	state.board = state.board.filter(row => {
		const full = row.every(Boolean);
		if (full) {
			cleared += 1;
		}
		return !full;
	});
	while (state.board.length < ROWS) {
		state.board.unshift(Array<Cell>(COLS).fill(null));
	}
	if (!cleared) {
		return;
	}
	const table = [0, 100, 300, 500, 800];
	state.lines += cleared;
	state.score += (table[cleared] || 800) * state.level;
	state.level = Math.floor(state.lines / 10) + 1;
	state.gravityMs = gravityFor(state.level);
}

function lockPiece(state: TetrisState) {
	if (!state.current) {
		return;
	}
	cellsOf(state.current).forEach(({ x, y }) => {
		if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
			state.board[y][x] = state.current?.id ?? null;
		}
	});
	state.current = null;
	state.lockAt = null;
	clearLines(state);
	if (state.status === 'running') {
		spawn(state);
	}
}

export function createTetrisState(): TetrisState {
	const bag = shuffle(BAG);
	const next = bag.pop() as PieceId;
	return {
		board: emptyBoard(),
		current: null,
		next,
		bag,
		score: 0,
		lines: 0,
		level: 1,
		status: 'idle',
		gravityMs: gravityFor(1),
		lastGravity: 0,
		lockAt: null
	};
}

export function startTetris(state: TetrisState, now: number) {
	state.status = 'running';
	state.lastGravity = now;
	if (!state.current) {
		spawn(state);
	}
}

export function ghostPiece(state: TetrisState): Active | null {
	if (!state.current) {
		return null;
	}
	const ghost = { ...state.current };
	while (!collides(state.board, { ...ghost, y: ghost.y + 1 })) {
		ghost.y += 1;
	}
	return ghost;
}

export function movePiece(state: TetrisState, dx: number, now: number) {
	if (state.status !== 'running' || !state.current) {
		return false;
	}
	const next = { ...state.current, x: state.current.x + dx };
	if (collides(state.board, next)) {
		return false;
	}
	state.current = next;
	if (onGround(state)) {
		state.lockAt = now;
	} else {
		state.lockAt = null;
	}
	return true;
}

export function rotatePiece(state: TetrisState, now: number) {
	if (state.status !== 'running' || !state.current || state.current.id === 'O') {
		return false;
	}
	const rot = (state.current.rot + 1) % 4;
	for (const kick of KICKS) {
		const next = {
			...state.current,
			rot,
			x: state.current.x + kick.x,
			y: state.current.y + kick.y
		};
		if (!collides(state.board, next)) {
			state.current = next;
			if (onGround(state)) {
				state.lockAt = now;
			} else {
				state.lockAt = null;
			}
			return true;
		}
	}
	return false;
}

export function softDrop(state: TetrisState, now: number) {
	if (state.status !== 'running' || !state.current) {
		return false;
	}
	const next = { ...state.current, y: state.current.y + 1 };
	if (collides(state.board, next)) {
		if (state.lockAt === null) {
			state.lockAt = now;
		}
		return false;
	}
	state.current = next;
	state.score += 1;
	state.lastGravity = now;
	state.lockAt = onGround(state) ? now : null;
	return true;
}

export function hardDrop(state: TetrisState) {
	if (state.status !== 'running' || !state.current) {
		return;
	}
	let dropped = 0;
	while (!collides(state.board, { ...state.current, y: state.current.y + 1 })) {
		state.current.y += 1;
		dropped += 1;
	}
	state.score += dropped * 2;
	lockPiece(state);
}

export function tickTetris(state: TetrisState, now: number) {
	if (state.status !== 'running' || !state.current) {
		return;
	}
	if (onGround(state)) {
		if (state.lockAt === null) {
			state.lockAt = now;
		}
		if (now - state.lockAt >= LOCK_MS) {
			lockPiece(state);
		}
		return;
	}
	state.lockAt = null;
	if (now - state.lastGravity < state.gravityMs) {
		return;
	}
	state.lastGravity = now;
	const next = { ...state.current, y: state.current.y + 1 };
	if (collides(state.board, next)) {
		state.lockAt = now;
		return;
	}
	state.current = next;
}
