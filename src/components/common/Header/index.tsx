import React from 'react';
import { Link } from 'react-router-dom';

import { headerData } from './headerData';

import './style.scss';

export default function Head() {
    return (
        <ul styleName="head">
            {
                headerData.map(({ name, route }) => (
                    <li>
                        <Link to={`/${route}`}>{name}</Link>
                    </li>
                ))
            }
        </ul>
    );
}
