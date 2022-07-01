import React, { useState } from 'react';

import Index from '../../components/ReactDoc/Index';
import Lifecycle from '../../components/ReactDoc/Lifecycle';
import Hooks from '../../components/ReactDoc/Hooks';

import LeftNav from '../../components/common/LeftNav';
import { leftNavData } from './data';

import './style.scss';

export default function ReactDoc() {
    const [activeIndex, handleSelectItem] = useState(() =>
        leftNavData.findIndex(item => location.pathname.includes(item.router)) > 0 ?
            leftNavData.findIndex(item => location.pathname.includes(item.router)) : 0
    );

    const getMainContent = () => {
        switch (activeIndex) {
            default:
            case 0:
                return <Index />;
            case 1:
                return <Lifecycle />;
            case 2:
                return <Hooks />;
        }
    };

    return (
        <div styleName="doc">
            <LeftNav
                data={leftNavData}
                firstRouter={'react'}
                handleSelectItem={handleSelectItem}
                activeIndex={activeIndex}
            />
            <div styleName="doc-main">{getMainContent()}</div>
        </div>
    );
}
