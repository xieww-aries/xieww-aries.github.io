import React, { useState } from 'react';

import Title from '../../components/common/Title';
import LeftNav from '../../components/common/LeftNav';
import ArrayIndex from '../../components/JsDoc/Index';

import { leftNavData } from './data';

import './style.scss';

export default function JsDoc() {
    // 当前选中的数组方法，初始化默认为第一项
    const [currentArrayFunction, handleSelectItem] = useState('array');

    return (
        <div styleName="doc">
            <LeftNav
                data={leftNavData}
                handleSelectItem={handleSelectItem}
                firstRouter={'js'}
            />
            <div styleName="doc-main">
                <Title title={`${currentArrayFunction}方法`} />
                <ArrayIndex />
            </div>
        </div>
    );
}
