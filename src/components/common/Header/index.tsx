import React from 'react';
import { Link } from 'react-router-dom';

import { headerData } from './headerData';

import './style.scss';

export default function Head() {
    const defaultSelectedKeyList = () => {
        const { pathname } = location;
        switch(pathname) {
            default:
            case '/index':
                return ['index'];
            case '/js':
                return ['js'];
            case '/webpack':
                return ['webpack'];
            case '/react':
                return ['react'];
            case '/interview':
                return ['interview'];
            case '/list':
                return ['list'];
            case '/game':
                return ['game'];
        }
    };
    return (
        <ul styleName="head">
            {
                headerData.map(({ name, route }) => (
                    <li>
                        <Link to={`/${route}`}>{name}</Link>
                    </li>
                ))
            }
        </ul>
    );
}
