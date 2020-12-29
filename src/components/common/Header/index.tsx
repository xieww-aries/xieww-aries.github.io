import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { headerData } from './headerData';

import './style.scss';

function Header(props) {
    const activeIndex = headerData.findIndex(item => props.location.pathname.includes(item.route));
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
