import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Index from '../../components/WebpackDoc/Index/index.jsx';
import Loaders from '../../components/WebpackDoc/Loaders/index.jsx';
import Babel from '../../components/WebpackDoc/Babel/index.jsx';
import PluginDoc from '../../components/WebpackDoc/PluginDoc/index.jsx';

import './style.scss';

// antd Menu 组件
import { Menu } from 'antd/lib';
import 'antd/dist/antd.css';

const { SubMenu } = Menu;

export default class WebpackDoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 当前babel已选择的项
            currentBabelValue: '',
            // 当前loader已选择的项
            currentLoaderValue: '',
            // 当前plugins已选择的项
            currentPluginValue: '',
            // 当前列表选择项
            currentSelectedValue: 'Index'
        };
    }
    handleSeletItem = ({ key: currentSelectedValue }) => {
        this.setState({ currentSelectedValue });
    }
    get mainContent() {
        const { currentSelectedValue } = this.state;
        switch (currentSelectedValue) {
            default:
            case 'Index':
                return <Index />;
            case 'Loaders':
                return <Loaders />;
            case 'Babel':
                return <Babel />;
            case 'Plugins':
                return <PluginDoc />;
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
                        mode="inline"
                    >
                        {/* About */}
                        <Menu.Item key={'Index'} styleName="nav-item">
                            <Link to={`/webpack/index`}>Index</Link>
                        </Menu.Item>

                        {/* Loaders */}
                        <Menu.Item key={'Loaders'} styleName="nav-item">
                            <Link to={`/webpack/loaders`}>Loaders</Link>
                        </Menu.Item>

                        {/* plugins */}
                        <Menu.Item key={'Plugins'} styleName="nav-item">
                            <Link to={`/webpack/plugin`}>Plugins</Link>
                        </Menu.Item>

                        {/* babel */}
                        <Menu.Item key={'Babel'} styleName="nav-item">
                            <Link to={`/webpack/babel`}>Babel</Link>
                        </Menu.Item>

                        {/* webpack编译原理 */}
                        <SubMenu title="webpack原理">
                            <Menu.Item
                                key={'compile'}
                                styleName="nav-item"
                            >
                                <Link to={`/webpack/compile`}>编译原理</Link>
                            </Menu.Item>
                            <Menu.Item
                                key={'pack'}
                                styleName="nav-item"
                            >
                                <Link to={`/webpack/pack`}>打包原理</Link>
                            </Menu.Item>
                        </SubMenu>

                        {/* webpack优化 */}
                        <SubMenu title="webpack优化">
                            <Menu.Item
                                key={'speed'}
                                styleName="nav-item"
                            >
                                <Link to={`/webpack/speed`}>优化打包速度</Link>
                            </Menu.Item>
                            <Menu.Item
                                key={'size'}
                                styleName="nav-item"
                            >
                                <Link to={`/webpack/size`}>优化打包体积</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div styleName="doc-main">
                    { mainContent }
                </div>
            </div>
        )
    }
}