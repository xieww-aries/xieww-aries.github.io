import React, { Component } from 'react';
import Title from '../../common/Title/index.jsx';

import './style.scss';

export default class Hooks extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (
            <div>
                <Title title={'React Hooks'} />
            </div>
        );
    }
}
