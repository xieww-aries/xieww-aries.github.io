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
            case '/list':
                return ['list'];
            case '/array':
                return ['array'];
            case '/introduce':
                return ['intro'];
            case '/loginRegiste':
                return ['login'];
        }
    }
    render() {
        const { defaultSelectedKeyList } = this;
        return (
            <div styleName="head">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={defaultSelectedKeyList}
                >
                    <Menu.Item key='index'>
                        <Link to="/index">首页</Link>
                    </Menu.Item>
                    <Menu.Item key='list'>
                        <Link to="/list">视频列表</Link>
                    </Menu.Item>
                    <Menu.Item key='array'>
                        <Link to="/array">数组</Link>
                    </Menu.Item>
                    <Menu.Item key='intro'>
                        <Link to="/introduce">介绍</Link>
                    </Menu.Item>
                    <Menu.Item key='login'>
                        <Link to="/loginRegiste">登陆/注册</Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}