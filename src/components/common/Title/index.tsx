import React from 'react';
import './style.scss';

interface IProps {
    title: string;
}

export default function Title(props: IProps) {
	return (
		<div styleName="title-wrap">
			<h1 styleName="common-title">{props.title}</h1>
		</div>
	);
}
