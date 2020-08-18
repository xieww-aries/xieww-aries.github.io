import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'antd/lib';
import 'antd/dist/antd.css';
import './style.scss';

import '../../../resource/reset.css';

export default function() {
    return (
        <div>
            <Menu theme="dark">
                <Menu.Item>
                    <Link to="/index">首页</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/list">视频列表</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/document">文档</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/introduce">介绍</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/loginRegiste">登陆/注册</Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}