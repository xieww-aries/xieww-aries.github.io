import React from 'react';
import $ from 'jquery';

import './style.scss';
import { listData } from './mockData';

import Title from '../common/Title/index.jsx';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieList: []
        };
    }
    componentWillMount() {
        $.ajax({
            url: '/movie/douban',
            data: {
                type: 'movie',
                tag: '热门',
                page_limit: 50,
                page_start: 0
            },
            success: data => {
                if (data && typeof data === 'object') {
                    this.setState({
                        movieList: data
                    });
                    console.log(111, data);
                }
            },
            error: err => {
                console.error(222, err);
            }
        })
    }
    goToDetail = url => {
        location.href = url;
    }
    render() {
        const { movieList } = this.state;
        return (
            <div>
                <Title title="电影列表" />
                <ul styleName="movie-box">
                    {
                        movieList.length > 0 && movieList.map(item => (
                            <li key={item.id} onClick={this.goToDetail.bind(this, item.url)}>
                                <img src={item.cover} />
                                <p>电影名称：{item.title}</p>
                                <p>电影评分：{item.rate}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}