import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Title from '../../components/common/Title/index.jsx';
import Principle from '../../components/WebpackDoc/Principle/index.jsx';

import './style.scss';

// antd Menu 组件
import { Menu } from 'antd/lib';
import 'antd/dist/antd.css';

const { SubMenu } = Menu;
const webpackList = ['babel', 'loader', 'plugin', 'webpack优化']

import { babelData } from './babelData';
import { loaderData } from './loaderData';

export default class WebpackDoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 当前babel已选择的项
            currentBabelValue: '',
            // 当前loader已选择的项
            currentLoaderValue: '',
            // 当前plugins已选择的项
            currentPluginValue: ''
        };
    }
    handleSeletItem = e => {
        console.log(111222, e);
    }
    render() {
        return (
            <div styleName="doc">
                <Menu
                    theme="dark"
                    mode="vertical"
                    styleName="doc-nav"
                    onSelect={this.handleSeletItem}
                    mode="inline"
                >
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
                    {/* babel */}
                    <SubMenu title="Babel" onTitleClick={this.handleSeletItem}>
                        {
                            babelData.map(({ name }) => (
                                <Menu.Item
                                    key={name}
                                    styleName="nav-item"
                                >
                                    <Link to={`/webpack/${name}`}>{name}</Link>
                                </Menu.Item>
                            ))
                        }
                    </SubMenu>
                    {/* loader */}
                    <SubMenu title="Loaders">
                        {
                            loaderData.map(({ name }) => (
                                <Menu.Item
                                    key={name}
                                    styleName="nav-item"
                                >
                                    <Link to={`/webpack/${name}`}>{name}</Link>
                                </Menu.Item>
                            ))
                        }
                    </SubMenu>
                    {/* plugins */}
                    <SubMenu title="Plugins">
                        {
                            webpackList.map(name => (
                                <Menu.Item
                                    key={name}
                                    styleName="nav-item"
                                >
                                    <Link to={`/webpack/${name}`}>{name}</Link>
                                </Menu.Item>
                            ))
                        }
                    </SubMenu>
                </Menu>
                <div styleName="doc-main">
                    <Title title={'Webpack知识点梳理'} />
                    <Principle />
                </div>
            </div>
        )
    }
}