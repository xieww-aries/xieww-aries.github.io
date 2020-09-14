import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

// antd Menu 组件
import { Menu } from 'antd/lib';
import '../../../../node_modules/antd/dist/antd.css';

export default class Head extends Component {
    get defaultSelectedKeyList() {
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
    render() {
        const { defaultSelectedKeyList } = this;
        console.log('111', defaultSelectedKeyList);
        return (
            <div styleName="head">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={defaultSelectedKeyList}
                >
                    <Menu.Item key='index'>
                        <Link to="/index">Index</Link>
                    </Menu.Item>
                    <Menu.Item key='js'>
                        <Link to="/js">Javascript</Link>
                    </Menu.Item>
                    <Menu.Item key='webpack'>
                        <Link to="/webpack">Webpack</Link>
                    </Menu.Item>
                    <Menu.Item key='react'>
                        <Link to="/react">React</Link>
                    </Menu.Item>
                    <Menu.Item key='interview'>
                        <Link to="/interview">Interview</Link>
                    </Menu.Item>
                    <Menu.Item key='list'>
                        <Link to="/list">List</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/game">Game</Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}