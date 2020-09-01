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
                I'm lifecycle
            </div>
        );
    }
}
