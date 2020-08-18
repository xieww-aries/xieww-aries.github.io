import React from 'react';

import Title from '../common/Title/index.jsx'
import './style.scss';

import { arrayFunctionList } from './content';

export default function Doc() {
    return (
        <div styleName="doc">
            <ul styleName="doc-nav">
                {
                    arrayFunctionList.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))
                }
            </ul>
            <div styleName="doc-title">
                <Title title={'我是doc页面'} />
            </div>
        </div>
    )
}
