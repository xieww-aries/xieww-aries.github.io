import React from 'react';

import Title from '../../components/common/Title';
import './style.scss';

export default function Doc() {
    return (
        <div styleName="doc">
            <div styleName="doc-title">
                <Title title={'我是doc页面'} />
            </div>
        </div>
    );
}
