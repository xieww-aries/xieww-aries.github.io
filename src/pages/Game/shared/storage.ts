export function readHighScore(key: string): number {
	try {
		const value = Number(window.localStorage.getItem(key));
		return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
	} catch {
		return 0;
	}
}

export function writeHighScore(key: string, score: number): number {
	const next = Math.max(readHighScore(key), Math.floor(score));
	try {
		window.localStorage.setItem(key, String(next));
	} catch {
		// ignore quota / private mode
	}
	return next;
}
