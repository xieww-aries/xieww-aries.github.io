import React from 'react';

import './DPad.scss';

export type Dir = 'up' | 'down' | 'left' | 'right';

interface Action {
	label: string;
	ariaLabel: string;
	onPress: () => void;
}

interface Props {
	onDir: (dir: Dir) => void;
	actions?: Action[];
}

export default function DPad({ onDir, actions }: Props) {
	const press = (dir: Dir) => (event: React.PointerEvent<HTMLButtonElement>) => {
		event.preventDefault();
		onDir(dir);
	};

	return (
		<>
			<div styleName="dpad">
				<button type="button" styleName="pad-btn up" aria-label="上" onPointerDown={press('up')}>
					▲
				</button>
				<button type="button" styleName="pad-btn left" aria-label="左" onPointerDown={press('left')}>
					◀
				</button>
				<button type="button" styleName="pad-btn right" aria-label="右" onPointerDown={press('right')}>
					▶
				</button>
				<button type="button" styleName="pad-btn down" aria-label="下" onPointerDown={press('down')}>
					▼
				</button>
			</div>
			{actions?.length ? (
				<div styleName="extra">
					{actions.map(action => (
						<button
							key={action.ariaLabel}
							type="button"
							styleName="pad-btn"
							aria-label={action.ariaLabel}
							onPointerDown={event => {
								event.preventDefault();
								action.onPress();
							}}
						>
							{action.label}
						</button>
					))}
				</div>
			) : null}
		</>
	);
}
