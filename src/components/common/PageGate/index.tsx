import React, { FormEvent, ReactNode, useCallback, useState } from 'react';

import Title from '../Title';
import './style.scss';

interface Props {
	title: string;
	lead: string;
	submitLabel: string;
	password: string;
	storageKey: string;
	children: (lock: () => void) => ReactNode;
}

function readUnlocked(storageKey: string) {
	try {
		return sessionStorage.getItem(storageKey) === '1';
	} catch {
		return false;
	}
}

export function LockButton({ onClick }: { onClick: () => void }) {
	return (
		<button type="button" styleName="lock" onClick={onClick}>
			锁定
		</button>
	);
}

export default function PageGate({ title, lead, submitLabel, password, storageKey, children }: Props) {
	const [unlocked, setUnlocked] = useState(() => readUnlocked(storageKey));
	const [value, setValue] = useState('');
	const [error, setError] = useState('');

	const lock = useCallback(() => {
		try {
			sessionStorage.removeItem(storageKey);
		} catch {
			// ignore
		}
		setUnlocked(false);
		setValue('');
		setError('');
	}, [storageKey]);

	const unlock = (event: FormEvent) => {
		event.preventDefault();

		if (value.trim() !== password) {
			setError('密码不对，再试一次。');
			return;
		}

		try {
			sessionStorage.setItem(storageKey, '1');
		} catch {
			// ignore
		}
		setUnlocked(true);
		setValue('');
		setError('');
	};

	if (!unlocked) {
		return (
			<div styleName="wrap">
				<Title title={title} />
				<form styleName="gate" onSubmit={unlock}>
					<p styleName="lead">{lead}</p>
					<label styleName="field">
						<span>口令</span>
						<input
							type="password"
							name={`${title.toLowerCase()}-password`}
							autoComplete="current-password"
							spellCheck={false}
							value={value}
							aria-invalid={error ? true : undefined}
							onChange={event => {
								setValue(event.target.value);
								if (error) setError('');
							}}
						/>
					</label>
					{error ? <p styleName="error">{error}</p> : null}
					<button type="submit" styleName="unlock">
						{submitLabel}
					</button>
				</form>
			</div>
		);
	}

	return <>{children(lock)}</>;
}
