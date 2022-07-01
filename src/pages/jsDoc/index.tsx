import React, { useState } from 'react';

import Title from '../../components/common/Title';
import LeftNav from '../../components/common/LeftNav';

import ArrayIndex from '../../components/JsDoc/Array';
import ObjectIndex from '../../components/JsDoc/Object';
import StringIndex from '../../components/JsDoc/String';
import Writing from '../../components/common/Writing';

import { leftNavData } from './data';

import './style.scss';

export default function JsDoc() {
    const [activeIndex, handleSelectItem] = useState(() =>
        leftNavData.findIndex(item => location.pathname.includes(item.router)) > 0 ?
            leftNavData.findIndex(item => location.pathname.includes(item.router)) : 0
    );

    const getMainContent = () => {
        switch (activeIndex) {
            default:
            case 0:
                return <ArrayIndex />;
            case 1:
                return <ObjectIndex />;
            case 2:
                return <StringIndex />;
            case 3:
                return <Writing />;
        }
    };

    console.log(222, leftNavData.findIndex(item => location.pathname.includes(item.router)));

    return (
        <div styleName="doc">
            <LeftNav
                data={leftNavData}
                handleSelectItem={handleSelectItem}
                firstRouter={'js'}
                activeIndex={activeIndex}
            />
            <div styleName="doc-main">
                <Title title={`${leftNavData[activeIndex].title}方法`} />
                {getMainContent()}
            </div>
        </div>
    );
}
