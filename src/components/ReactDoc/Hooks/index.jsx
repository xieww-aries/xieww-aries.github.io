import React, { Component } from 'react';
import Title from '../../common/Title';

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
                <a href="https://zh-hans.reactjs.org/docs/hooks-intro.html">官网: https://zh-hans.reactjs.org/docs/hooks-intro.html</a>
            </div>
        );
    }
}
