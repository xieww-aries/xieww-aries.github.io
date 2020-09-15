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
    }
    return (
        <div styleName="head">
            <p>
                <Link to="/index">Index</Link>
            </p>
            <p>
                <Link to="/js">Javascript</Link>
            </p>
            <p>
                <Link to="/webpack">Webpack</Link>
            </p>
            <p>
                <Link to="/react">React</Link>
            </p>
            <p>
                <Link to="/interview">Interview</Link>
            </p>
            <p>
                <Link to="/list">List</Link>
            </p>
            <p>
                <Link to="/game">Game</Link>
            </p>
        </div>
    );
}