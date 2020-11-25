import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Title from '../../components/common/Title';
// @ts-ignore
import ArrayIndex from '../../components/JsDoc/Index';
import './style.scss';

export default function JsDoc() {
    // 当前选中的数组方法，初始化默认为第一项
    const [currentArrayFunction, handleSelectItem] = useState('array');

    return (
        <div styleName="doc">
            <ul styleName="doc-nav">
                <li
                    key={'array'}
                    styleName="nav-item"
                    onClick={() => handleSelectItem('array')}
                >
                    <Link to={`/js/array`}>Array</Link>
                </li>
                <li
                    key={'object'}
                    styleName="nav-item"
                    onClick={() => handleSelectItem('object')}
                >
                    <Link to={`/js/object`}>Object</Link>
                </li>
            </ul>
            <div styleName="doc-main">
                <Title title={`${currentArrayFunction}方法`} />
                <ArrayIndex />
            </div>
        </div>
    );
}
