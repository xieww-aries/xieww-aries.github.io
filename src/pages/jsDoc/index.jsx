import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Title from '../../components/common/Title/index.jsx';
import ArrayIndex from '../../components/JsDoc/Index/index.jsx';
import './style.scss';

// antd Menu 组件
import { Menu } from 'antd/lib';
import 'antd/dist/antd.css';

import { arrayFunctionList } from './content';

export default class JsDoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 当前选中的数组方法，初始化默认为第一项
            currentArrayFunction: 'array'
        };
    }
    handleSeletItem = ({ key: currentArrayFunction }) => {
        this.setState({
            currentArrayFunction
        });
    }
    render() {
        const { currentArrayFunction } = this.state;
        return (
            <div styleName="doc">
                <Menu
                    theme="dark"
                    mode="vertical"
                    styleName="doc-nav"
                    onSelect={this.handleSeletItem}
                >
                    <Menu.Item
                        key={'array'}
                        styleName="nav-item"
                    >
                        <Link to={`/js/array`}>Array</Link>
                    </Menu.Item>
                    <Menu.Item
                        key={'object'}
                        styleName="nav-item"
                    >
                        <Link to={`/js/object`}>Object</Link>
                    </Menu.Item>
                </Menu>
                <div styleName="doc-main">
                    <Title title={`${currentArrayFunction}方法`} />
                    <ArrayIndex />
                </div>
            </div>
        );
    }
}
