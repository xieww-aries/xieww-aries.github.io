import React from 'react';
import './style.scss';

interface IProps {
    title: string;
}

export default function Title(props: IProps) {
	return <p styleName="common-title">{props.title}</p>;
}
