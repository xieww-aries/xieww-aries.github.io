import React, { useState } from 'react';

import ThrottleDebounce from '../../components/Interview/ThrottleDebounce';
import Fiber from '../../components/Interview/Fiber';
import PromiseDoc from '../../components/Interview/PromiseDoc';
import LeftNav from '../../components/common/LeftNav';

import './style.scss';

import { leftNavData } from './data';

export default function interview() {
    const [currentSelectedValue, handleSelectItem] = useState('throttleDebounce');

    let mainContent = null;
    switch (currentSelectedValue) {
        default:
        case 'throttleDebounce':
            mainContent = <ThrottleDebounce />;
            break;
        case 'fiber':
            mainContent = <Fiber />;
            break;
        case 'promise':
            mainContent = <PromiseDoc />;
            break;
    }

    return (
        <div styleName="doc">
            <LeftNav
                data={leftNavData}
                firstRouter={'interview'}
                handleSelectItem={handleSelectItem}
            />
            <div styleName="doc-main">{mainContent}</div>
        </div>
    );
}
