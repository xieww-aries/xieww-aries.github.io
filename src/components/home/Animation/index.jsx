import React from 'react';
import './style.scss';

export default function Animation() {
    return (
        <div className="stage">
            <ul className="container">
                <li className="before">前</li>
                <li className="after">后</li>
                <li className="left">左</li>
                <li className="right">右</li>
                <li className="up">上</li>
                <li className="down">下</li>
                <p className="before_little">前</p>
                <p className="after_little">后</p>
                <p className="left_little">左</p>
                <p className="right_little">右</p>
                <p className="up_little">上</p>
                <p className="down_little">下</p>
            </ul>
        </div>
    )
}