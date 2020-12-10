import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Index from '../../components/ReactDoc/Index';
import Lifecycle from '../../components/ReactDoc/Lifecycle';
import Hooks from '../../components/ReactDoc/Hooks';

import './style.scss';

export default function ReactDoc() {
    // 当前列表选择项
    const [currentSelectedValue, handleSeletItem] = useState('index');

    let mainContent = null;
    switch (currentSelectedValue) {
        default:
        case 'Index':
            mainContent = <Index />;
            break;
        case 'Lifecycle':
            mainContent = <Lifecycle />;
            break;
        case 'Hooks':
            mainContent = <Hooks />;
            break;
    }

    return (
        <div styleName="doc">
            <div styleName="doc-nav">
                <ul>
                    {/* 首页 */}
                    <li key={'Index'} styleName="nav-item" onClick={() => handleSeletItem('Index')}>
                        <Link to={`/react/index`}>Index</Link>
                    </li>
                    {/* 生命周期 */}
                    <li key={'Lifecycle'} styleName="nav-item" onClick={() => handleSeletItem('Lifecycle')}>
                        <Link to={`/react/lifecycle`}>Lifecycle</Link>
                    </li>
                    {/* Hooks */}
                    <li key={'Hooks'} styleName="nav-item" onClick={() => handleSeletItem('Hooks')}>
                        <Link to={`/react/hooks`}>Hooks</Link>
                    </li>
                </ul>
            </div>
            <div styleName="doc-main">{mainContent}</div>
        </div>
    );
}
