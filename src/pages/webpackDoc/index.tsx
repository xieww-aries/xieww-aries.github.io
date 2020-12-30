import React, { useState } from 'react';

import Index from '../../components/WebpackDoc/Index';
import Loaders from '../../components/WebpackDoc/Loaders';
import Babel from '../../components/WebpackDoc/Babel';
import PluginDoc from '../../components/WebpackDoc/PluginDoc';
import LeftNav from '../../components/common/LeftNav';

import { leftNavData } from './data';

import './style.scss';

export default function WebpackDoc() {
    // 当前列表选择项
    const [currentSelectedValue, handleSelectItem] = useState('about');
    let mainContent = null;
    switch (currentSelectedValue) {
        default:
        case 'about':
            mainContent = <Index />;
            break;
        case 'loaders':
            mainContent = <Loaders />;
            break;
        case 'plugin':
            mainContent = <PluginDoc />;
            break;
        case 'babel':
            mainContent = <Babel />;
            break;
    }
    return (
        <div styleName="doc">
            <LeftNav
                data={leftNavData}
                firstRouter={'webpack'}
                handleSelectItem={handleSelectItem}
            />
            <div styleName="doc-main">{mainContent}</div>
        </div>
    );
}
