import React, { useState } from 'react';

import Index from '../../components/WebpackDoc/Index';
import Loaders from '../../components/WebpackDoc/Loaders';
import Babel from '../../components/WebpackDoc/Babel';
import PluginDoc from '../../components/WebpackDoc/PluginDoc';
import LeftNav from '../../components/common/LeftNav';
import Writing from '../../components/common/Writing';

import { leftNavData } from './data';

import './style.scss';

export default function WebpackDoc() {
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
                return <Loaders />;
            case 2:
                return <PluginDoc />;
            case 3:
                return <Babel />;
            case 4:
            case 5:
            case 6:
            case 7:
                return <Writing />;
        }
    };
    console.log(111, activeIndex);

    return (
        <div styleName="doc">
            <LeftNav
                data={leftNavData}
                firstRouter={'webpack'}
                handleSelectItem={handleSelectItem}
            />
            <div styleName="doc-main">{getMainContent()}</div>
        </div>
    );
}
