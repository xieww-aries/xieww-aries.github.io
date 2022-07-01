import React, { useState } from 'react';

import ThrottleDebounce from '../../components/Interview/ThrottleDebounce';
import Fiber from '../../components/Interview/Fiber';
import PromiseDoc from '../../components/Interview/PromiseDoc';
import LeftNav from '../../components/common/LeftNav';
import Writing from '../../components/common/Writing';

import './style.scss';

import { leftNavData } from './data';

export default function interview() {
    const [activeIndex, handleSelectItem] = useState(() =>
        leftNavData.findIndex(item => location.pathname.includes(item.router)) > 0 ?
            leftNavData.findIndex(item => location.pathname.includes(item.router)) : 0
    );

    const getMainContent = () => {
        switch (activeIndex) {
            default:
            case 0:
                return <Writing />;
            case 1:
                return <ThrottleDebounce />;
            case 2:
                return <Writing />;
            case 3:
                return <PromiseDoc />;
            case 4:
                return <Writing />;
            case 5:
                return <Writing />;
            case 6:
                return <Fiber />;
        }
    };

    return (
        <div styleName="doc">
            <LeftNav
                data={leftNavData}
                firstRouter={'interview'}
                handleSelectItem={handleSelectItem}
            />
            <div styleName="doc-main">{getMainContent()}</div>
        </div>
    );
}
