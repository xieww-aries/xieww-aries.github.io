import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ThrottleDebounce from '../../components/Interview/ThrottleDebounce';
import Fiber from '../../components/Interview/Fiber';
import PromiseDoc from '../../components/Interview/PromiseDoc';

import './style.scss';

import { data } from './data';

export default function interview() {
    const [currentSelectedValue, handleSelectItem] = useState('ThrottleDebounce');

    let mainContent = null;
    switch(currentSelectedValue) {
        default:
        case 'ThrottleDebounce':
            mainContent = <ThrottleDebounce />;
            break;
        case 'Fiber':
            mainContent = <Fiber />;
            break;
        case 'Promise':
            mainContent = <PromiseDoc />;
            break;
    }

    return (
        <div styleName="doc">
            <div styleName="doc-nav">
                <ul>
                    {
                        data.map(({ route, name, key }) => (
                            <li
                                key={key}
                                styleName="nav-item"
                                onClick={() => handleSelectItem(key)}
                            >
                                <Link to={`/interview/${route}`}>{name}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div styleName="doc-main">
                { mainContent }
            </div>
        </div>
    );
}
