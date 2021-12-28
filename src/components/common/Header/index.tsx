import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { headerData } from './headerData';

import './style.scss';

function Header(props) {
    let activeIndex = headerData.findIndex(item => props.location.pathname.includes(item.route));
    if (activeIndex < 0) activeIndex = 0;

    console.log(process.env);
    return (
        <ul styleName="head">
            {headerData.map(({ name, route }, index) => (
                <li
                    key={index}
                    styleName={activeIndex === index ? 'head-item active-li' : 'head-item'}
                >
                    <Link to={`/${route}`}>{name}</Link>
                </li>
            ))}
        </ul>
    );
}

export default withRouter(Header);
