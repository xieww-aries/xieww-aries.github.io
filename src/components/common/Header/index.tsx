import React from 'react';
import { Link } from 'react-router-dom';
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
    const headerData = [
        {
            name: 'Index',
            route: 'index'
        },
        {
            name: 'Javascript',
            route: 'js'
        },
        {
            name: 'Webpack',
            route: 'webpack'
        },
        {
            name: 'React',
            route: 'react'
        },
        {
            name: 'Interview',
            route: 'interview'
        },
        {
            name: 'List',
            route: 'list'
        },
        {
            name: 'Game',
            route: 'game'
        }
    ];
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
