import React, { useState } from 'react';

import Title from '../../components/common/Title';
import LeftNav from '../../components/common/LeftNav';

import ArrayIndex from '../../components/JsDoc/Array';
import ObjectIndex from '../../components/JsDoc/Object';
import StringIndex from '../../components/JsDoc/String';

import { leftNavData } from './data';

import './style.scss';

export default function JsDoc() {
    // 当前选中的数组方法，初始化默认为第一项
    const [currentArrayFunction, handleSelectItem] = useState('array');

    let mainContent: any = null;
    switch (currentArrayFunction) {
        default:
        case 'array':
            mainContent = <ArrayIndex />;
            break;
        case 'object':
            mainContent = <ObjectIndex />;
            break;
        case 'string':
            mainContent = <StringIndex />;
            break;

    }

    return (
        <div styleName="doc">
            <LeftNav
                data={leftNavData}
                handleSelectItem={handleSelectItem}
                firstRouter={'js'}
            />
            <div styleName="doc-main">
                <Title title={`${currentArrayFunction}方法`} />
                {mainContent}
            </div>
        </div>
    );
}
