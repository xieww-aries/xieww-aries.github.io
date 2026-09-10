export function setupCanvas(canvas: HTMLCanvasElement, cssWidth: number, cssHeight: number) {
	const dpr = Math.min(window.devicePixelRatio || 1, 2);
	canvas.width = Math.round(cssWidth * dpr);
	canvas.height = Math.round(cssHeight * dpr);
	canvas.style.width = '100%';
	canvas.style.height = 'auto';
	const ctx = canvas.getContext('2d');
	if (!ctx) {
		return null;
	}
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	return ctx;
}

export function roundRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	w: number,
	h: number,
	r: number
) {
	const radius = Math.max(0, Math.min(r, w / 2, h / 2));
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.arcTo(x + w, y, x + w, y + h, radius);
	ctx.arcTo(x + w, y + h, x, y + h, radius);
	ctx.arcTo(x, y + h, x, y, radius);
	ctx.arcTo(x, y, x + w, y, radius);
	ctx.closePath();
}

export function paintCell(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	size: number,
	color: string,
	gap = 2
) {
	const inset = gap / 2;
	roundRect(ctx, x + inset, y + inset, size - gap, size - gap, Math.max(3, size * 0.18));
	ctx.fillStyle = color;
	ctx.fill();
	ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
	roundRect(
		ctx,
		x + inset + 2,
		y + inset + 2,
		Math.max(4, (size - gap) * 0.42),
		Math.max(3, (size - gap) * 0.22),
		4
	);
	ctx.fill();
}
