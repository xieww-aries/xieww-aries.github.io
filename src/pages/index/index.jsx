import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './style.scss';

import $ from 'jquery';

import '../../resource/reset.css';

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
            <BrowserRouter>
                <div className="home">
                    我是首页
                </div>
            </BrowserRouter>
        )
    }
}
