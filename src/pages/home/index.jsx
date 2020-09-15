import React, { Component } from 'react';
import './style.scss';
import $ from 'jquery';

import Animation from '../../components/Home/3DAnimation';

import Title from '../../components/common/Title';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
        // this.getDouBanData();
    }
    panelChange = (value, mode) => {
        console.log('value', value);
        console.log('mode', mode);
    }
    getDouBanData = () => {
        $.ajax({
            url: 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limi',
            success: data => {
                console.log('data', data);
            },
            error: err => {
                console.log('err', err);
            }
        })
    }
    render() {
        return (
            <div styleName="home">
                <Title title={'我是首页'} />
                <Animation />
            </div>
        )
    }
}
