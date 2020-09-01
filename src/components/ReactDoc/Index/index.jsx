import React, { Component } from 'react';

import Title from '../../common/Title/index.jsx';
import './style.scss';

export default class Index extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (
            <div>
                <Title title={'React 知识点梳理'} />
            </div>
        )
    }
}
