import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Index from '../../components/ReactDoc/Index/index.jsx';
import Lifecycle from '../../components/ReactDoc/Lifecycle/index.jsx';
import Hooks from '../../components/ReactDoc/Hooks/index.jsx';

import './style.scss';

// antd Menu 组件
import { Menu } from 'antd/lib';
import 'antd/dist/antd.css';

export default class ReactDoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 当前列表选择项
            currentSelectedValue: 'index'
        };
    }
    handleSeletItem = ({ key: currentSelectedValue }) => {
        this.setState({ currentSelectedValue });
    }
    get mainContent() {
        const { currentSelectedValue } = this.state;
        switch(currentSelectedValue) {
            default:
            case 'index':
                return <Index />;
            case 'Lifecycle':
                return <Lifecycle />;
            case 'Hooks':
                return <Hooks />;
        }
    }
    render() {
        const { mainContent } = this;
        return (
            <div styleName="doc">
                <div styleName="doc-nav">
                    <Menu
                        theme="dark"
                        mode="vertical"
                        onSelect={this.handleSeletItem}
                    >
                        {/* 首页 */}
                        <Menu.Item key={'index'} styleName="nav-item">
                            <Link to={`/react/index`}>Index</Link>
                        </Menu.Item>
                        {/* 生命周期 */}
                        <Menu.Item key={'Lifecycle'} styleName="nav-item">
                            <Link to={`/react/lifecycle`}>Lifecycle</Link>
                        </Menu.Item>
                        {/* Hooks */}
                        <Menu.Item key={'Hooks'} styleName="nav-item">
                            <Link to={`/react/hooks`}>Hooks</Link>
                        </Menu.Item>
                    </Menu>
                </div>
                <div styleName="doc-main">
                    { mainContent }
                </div>
            </div>
        );
    }
}
