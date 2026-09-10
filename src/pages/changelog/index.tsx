import React from 'react';

import Title from '../../components/common/Title';
import changelog from '../../../CHANGELOG.md';

import './style.scss';

function stripMarkdown(text: string) {
	return text
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/`([^`]+)`/g, '$1')
		.trim();
}

export default function Changelog() {
	const lines = changelog.split('\n');

	return (
		<div styleName="page">
			<Title title="Changelog" />
			<article styleName="article">
				{lines.map((line, index) => {
					if (line.startsWith('# ')) {
						return null;
					}
					if (line.startsWith('### ')) {
						return (
							<h3 key={index} styleName="h3">
								{stripMarkdown(line.slice(4))}
							</h3>
						);
					}
					if (line.startsWith('## ')) {
						return (
							<h2 key={index} styleName="h2">
								{stripMarkdown(line.slice(3))}
							</h2>
						);
					}
					if (line.startsWith('- ') || line.startsWith('* ')) {
						return (
							<p key={index} styleName="item">
								{stripMarkdown(line.slice(2))}
							</p>
						);
					}
					if (!line.trim()) {
						return null;
					}
					return (
						<p key={index} styleName="paragraph">
							{stripMarkdown(line)}
						</p>
					);
				})}
			</article>
		</div>
	);
}
