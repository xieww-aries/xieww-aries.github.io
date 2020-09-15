import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ThrottleDebounce from '../../components/Interview/ThrottleDebounce';
import Fiber from '../../components/Interview/Fiber';

import './style.scss';

// antd Menu 组件
import { Menu } from 'antd/lib';
import 'antd/dist/antd.css';

export default function interview() {
    const [currentSelectedValue, handleSeletItem] = useState('ThrottleDebounce');

    const mainContent = () => {
        switch(currentSelectedValue) {
            case 'ThrottleDebounce':
                return <ThrottleDebounce />;
            case 'Fiber':
                return <Fiber />
        }
    }
    return (
        <div styleName="doc">
            <div styleName="doc-nav">
                <Menu
                    theme="dark"
                    mode="vertical"
                    onSelect={({ key }) => handleSeletItem(key)}
                >
                    {/* 继承 */}
                    <Menu.Item key={'Inherit'} styleName="nav-item">
                        <Link to={`/interview/inherit`}>Inherit(继承)</Link>
                    </Menu.Item>
                    {/* 节流和防抖 */}
                    <Menu.Item key={'ThrottleDebounce'} styleName="nav-item">
                        <Link to={`/interview/throttledebounce`}>throttle and debounce</Link>
                    </Menu.Item>
                    {/* 事件循环 */}
                    <Menu.Item key={'Eventloop'} styleName="nav-item">
                        <Link to={`/interview/eventloop`}>Eventloop</Link>
                    </Menu.Item>
                    {/* Promise 及其实现 */}
                    <Menu.Item key={'Promise'} styleName="nav-item">
                        <Link to={`/interview/promise`}>Promise</Link>
                    </Menu.Item>
                    {/* bind / call / apply 和 手动实现 bind */}
                    <Menu.Item key={'BindDoc'} styleName="nav-item">
                        <Link to={`/interview/bindDoc`}>bind / call / apply 和 手动实现 bind</Link>
                    </Menu.Item>
                    {/* 装饰器 */}
                    <Menu.Item key={'Decorator'} styleName="nav-item">
                        <Link to={`/interview/decorator`}>Decorator</Link>
                    </Menu.Item>
                    {/* Fiber */}
                    <Menu.Item key={'Fiber'} styleName="nav-item">
                        <Link to={`/interview/fiber`}>Fiber</Link>
                    </Menu.Item>
                </Menu>
            </div>
            <div styleName="doc-main">
                { mainContent() }
            </div>
        </div>
    );
}
