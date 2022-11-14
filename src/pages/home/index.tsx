import React from 'react';
import './style.scss';

import Animation from '../../components/Home/3DAnimation';
import Dashboard from '../../components/Home/Dashboard';

import Title from '../../components/common/Title';

export default function Home() {
    return (
        <div styleName="home">
            <Title title={'目录'} />
            <Dashboard />
            <Animation />
        </div>
    );
}
