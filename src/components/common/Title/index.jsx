import React from 'react';
import './style.scss';

export default function Title(props) {
    return (
        <p styleName="common-title">
            { props.title }
        </p>
    );
}