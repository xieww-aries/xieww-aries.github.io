import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

export default function LeftNav(props) {
    const { data, firstRouter, handleSelectItem } = props;
    return (
        <ul styleName="doc-nav">
            {
                data.map((item) => (
                    <li
                        key={item.title}
                        onClick={() => handleSelectItem(item.router)}
                        styleName="nav-item"
                    >
                        <Link to={`/${firstRouter}/${item.router}`}>
                            {item.title}
                        </Link>
                        <span styleName="item-arrow" className="iconfont icon-arrow-right"></span>
                    </li>
                ))
            }
        </ul>
    );
}
