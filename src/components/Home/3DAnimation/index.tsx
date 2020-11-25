import React from 'react';
import './style.scss';

export default function Animation() {
    return (
        <div styleName="stage">
            <ul styleName="container">
                <li styleName="before">前</li>
                <li styleName="after">后</li>
                <li styleName="left">左</li>
                <li styleName="right">右</li>
                <li styleName="up">上</li>
                <li styleName="down">下</li>
                <p styleName="before_little">前</p>
                <p styleName="after_little">后</p>
                <p styleName="left_little">左</p>
                <p styleName="right_little">右</p>
                <p styleName="up_little">上</p>
                <p styleName="down_little">下</p>
            </ul>
        </div>
    );
}