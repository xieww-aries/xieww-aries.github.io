import React, { useCallback, useEffect, useMemo, useState } from 'react';

import PageGate, { LockButton } from '../../components/common/PageGate';
import Title from '../../components/common/Title';
import { albumPassword, albumUnlockKey, albums, photos } from './data';
import './style.scss';

function AlbumBody({ onLock }: { onLock: () => void }) {
	const [activeAlbum, setActiveAlbum] = useState<(typeof albums)[number]['id']>('all');
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const list = useMemo(
		() => (activeAlbum === 'all' ? photos : photos.filter(photo => photo.album === activeAlbum)),
		[activeAlbum]
	);

	const activePhoto = activeIndex === null ? null : list[activeIndex];

	const close = useCallback(() => setActiveIndex(null), []);

	const showPrev = useCallback(() => {
		setActiveIndex(index => (index === null || list.length === 0 ? index : (index + list.length - 1) % list.length));
	}, [list.length]);

	const showNext = useCallback(() => {
		setActiveIndex(index => (index === null || list.length === 0 ? index : (index + 1) % list.length));
	}, [list.length]);

	useEffect(() => {
		setActiveIndex(null);
	}, [activeAlbum]);

	useEffect(() => {
		if (activeIndex === null) {
			return undefined;
		}

		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') close();
			if (event.key === 'ArrowLeft') showPrev();
			if (event.key === 'ArrowRight') showNext();
		};

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', onKey);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', onKey);
		};
	}, [activeIndex, close, showPrev, showNext]);

	return (
		<div styleName="page">
			<div styleName="head">
				<Title title="Album" />
				<LockButton onClick={onLock} />
			</div>
			<p styleName="lead">旅行、城市和日常里留下来的画面，点开可以看大图。</p>
			<ul styleName="filters">
				{albums.map(album => (
					<li key={album.id}>
						<button
							type="button"
							styleName={activeAlbum === album.id ? 'chip active' : 'chip'}
							onClick={() => setActiveAlbum(album.id)}
						>
							{album.name}
							<em>
								{album.id === 'all' ? photos.length : photos.filter(photo => photo.album === album.id).length}
							</em>
						</button>
					</li>
				))}
			</ul>
			{list.length === 0 ? (
				<div className="empty-note">
					<strong>还没有照片</strong>
					把图片放到 static/album，再写入 data.ts 即可。
				</div>
			) : (
				<ul styleName="masonry">
					{list.map((photo, index) => (
						<li key={photo.id}>
							<button type="button" styleName="card" onClick={() => setActiveIndex(index)}>
								<img src={photo.src} alt={photo.alt} loading="lazy" />
								<span styleName="meta">
									<strong>{photo.caption}</strong>
									<em>{photo.date}</em>
								</span>
							</button>
						</li>
					))}
				</ul>
			)}
			{activePhoto ? (
				<div
					styleName="lightbox"
					role="dialog"
					aria-modal="true"
					aria-label={activePhoto.alt}
					onClick={close}
				>
					<button type="button" styleName="close" onClick={close} aria-label="关闭">
						关闭
					</button>
					<button
						type="button"
						styleName="nav prev"
						aria-label="上一张"
						onClick={event => {
							event.stopPropagation();
							showPrev();
						}}
					>
						‹
					</button>
					<figure styleName="frame" onClick={event => event.stopPropagation()}>
						<img src={activePhoto.src} alt={activePhoto.alt} />
						<figcaption styleName="caption">
							<strong>{activePhoto.caption}</strong>
							<span>{activePhoto.date}</span>
						</figcaption>
					</figure>
					<button
						type="button"
						styleName="nav next"
						aria-label="下一张"
						onClick={event => {
							event.stopPropagation();
							showNext();
						}}
					>
						›
					</button>
				</div>
			) : null}
		</div>
	);
}

export default function Album() {
	return (
		<PageGate
			title="Album"
			lead="相册需要口令才能查看。"
			submitLabel="进入相册"
			password={albumPassword}
			storageKey={albumUnlockKey}
		>
			{lock => <AlbumBody onLock={lock} />}
		</PageGate>
	);
}
