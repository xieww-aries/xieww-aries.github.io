import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Title from '../../components/common/Title/index.jsx'
import './style.scss';

// antd Menu 组件
import { Menu } from 'antd/lib';
import 'antd/dist/antd.css';

import { arrayFunctionList } from './content';

export default class ArrayDoc extends Component {
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
                    {
                        arrayFunctionList.map(({ name }) => (
                            <Menu.Item
                                key={name}
                                styleName="nav-item"
                                defaultSelectedKeys={[name === currentArrayFunction && name]}
                            >
                                <Link to={`/array/${name}`}>{name}</Link>
                            </Menu.Item>
                        ))
                    }
                </Menu>
                <div styleName="doc-title">
                    <Title title={`${currentArrayFunction}方法`} />
                </div>
            </div>
        );
    }
}
