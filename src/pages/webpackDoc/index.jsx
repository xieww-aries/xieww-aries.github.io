import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Title from '../../components/common/Title/index.jsx'

import './style.scss';

// antd Menu 组件
import { Menu } from 'antd/lib';
import 'antd/dist/antd.css';

const { SubMenu } = Menu;
const webpackList = ['babel', 'loader', 'plugin']

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
                    {/* babel */}
                    <SubMenu title="Babel" onTitleClick={this.handleSeletItem}>
                        {
                            babelData.map(({ name }) => (
                                <Menu.Item
                                    key={name}
                                    styleName="nav-item"
                                    defaultSelectedKeys={['babel']}
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
                                    defaultSelectedKeys={['babel']}
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
                                    defaultSelectedKeys={['babel']}
                                >
                                    <Link to={`/webpack/${name}`}>{name}</Link>
                                </Menu.Item>
                            ))
                        }
                    </SubMenu>
                </Menu>
                <div styleName="doc-main">
                    <Title title={'Webpack知识点梳理'} />
                </div>
            </div>
        )
    }
}