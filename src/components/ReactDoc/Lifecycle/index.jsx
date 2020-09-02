import React, { Component } from 'react';
import Title from '../../common/Title/index.jsx';

export default class Lifecycle extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <Title title={'React Lifecycle'} />
                <p>文档地址：<a href="https://segmentfault.com/a/1190000016617400">https://segmentfault.com/a/1190000016617400</a></p>
            </div>
        );
    }
}
