import React, { useState } from 'react';

import Index from '../../components/ReactDoc/Index';
import Lifecycle from '../../components/ReactDoc/Lifecycle';
import Hooks from '../../components/ReactDoc/Hooks';

import LeftNav from '../../components/common/LeftNav';
import { leftNavData } from './data';

import './style.scss';

export default function ReactDoc() {
    // 当前列表选择项
    const [currentSelectedValue, handleSelectItem] = useState('about');

    let mainContent = null;
    switch (currentSelectedValue) {
        default:
        case 'about':
            mainContent = <Index />;
            break;
        case 'lifecycle':
            mainContent = <Lifecycle />;
            break;
        case 'hooks':
            mainContent = <Hooks />;
            break;
    }

    return (
        <div styleName="doc">
            <LeftNav
                data={leftNavData}
                firstRouter={'react'}
                handleSelectItem={handleSelectItem}
            />
            <div styleName="doc-main">{mainContent}</div>
        </div>
    );
}
