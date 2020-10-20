import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Index from '../../components/WebpackDoc/Index';
import Loaders from '../../components/WebpackDoc/Loaders';
import Babel from '../../components/WebpackDoc/Babel';
import PluginDoc from '../../components/WebpackDoc/PluginDoc';

import './style.scss';

export default function WebpackDoc() {
    // 当前列表选择项
    const [currentSelectedValue, handleSelectItem] = useState('Index');
    let mainContent = null;
    switch (currentSelectedValue) {
        default:
        case 'Index':
            mainContent = <Index />;
            break;
        case 'Loaders':
            mainContent = <Loaders />;
            break;
        case 'Plugins':
            mainContent = <PluginDoc />;
            break;
        case 'Babel':
            mainContent = <Babel />;
            break;
    }
    return (
        <div styleName="doc">
            <div styleName="doc-nav">
                <ul>
                    {/* About */}
                    <li key={'Index'} styleName="nav-item" onClick={() => handleSelectItem('Index')}>
                        <Link to={`/webpack/index`}>Index</Link>
                    </li>

                    {/* Loaders */}
                    <li key={'Loaders'} styleName="nav-item" onClick={() => handleSelectItem('Loaders')}>
                        <Link to={`/webpack/loaders`}>Loaders</Link>
                    </li>

                    {/* plugins */}
                    <li key={'Plugins'} styleName="nav-item" onClick={() => handleSelectItem('Plugins')}>
                        <Link to={`/webpack/plugin`}>Plugins</Link>
                    </li>

                    {/* babel */}
                    <li key={'Babel'} styleName="nav-item" onClick={() => handleSelectItem('Babel')}>
                        <Link to={`/webpack/babel`}>Babel</Link>
                    </li>

                    {/* webpack编译原理 */}
                    <li title="webpack原理">
                        <p
                            key={'compile'}
                            styleName="nav-item"
                        >
                            <Link to={`/webpack/compile`}>编译原理</Link>
                        </p>
                        <p
                            key={'pack'}
                            styleName="nav-item"
                        >
                            <Link to={`/webpack/pack`}>打包原理</Link>
                        </p>
                    </li>

                    {/* webpack优化 */}
                    <li title="webpack优化">
                        <p
                            key={'speed'}
                            styleName="nav-item"
                        >
                            <Link to={`/webpack/speed`}>优化打包速度</Link>
                        </p>
                        <p
                            key={'size'}
                            styleName="nav-item"
                        >
                            <Link to={`/webpack/size`}>优化打包体积</Link>
                        </p>
                    </li>
                </ul>
            </div>
            <div styleName="doc-main">
                { mainContent }
            </div>
        </div>
    );
}