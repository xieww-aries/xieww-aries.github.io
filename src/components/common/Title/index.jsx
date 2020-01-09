import React from 'react';
import './style.scss';

export default function Title(props) {
    return (
        <p className="common-title">
            { props.title }
        </p>
    )
}