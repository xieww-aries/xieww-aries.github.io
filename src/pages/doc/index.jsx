import React from 'react';

import Title from '../../components/common/Title/index.jsx'
import './style.scss';

// antd Menu 组件
import { Menu } from 'antd/lib';
import './node_modules/antd/dist/antd.css';

import { arrayFunctionList } from './content';

export default function Doc() {
    return (
        <div styleName="doc">
            <Menu theme="dark" mode="vertical" styleName="doc-nav">
                {
                    arrayFunctionList.map((item, index) => (
                        <Menu.Item key={index} styleName="nav-item">
                            {item.name}
                        </Menu.Item>
                    ))
                }
            </Menu>
            <div styleName="doc-title">
                <Title title={'我是doc页面'} />
            </div>
        </div>
    )
}
