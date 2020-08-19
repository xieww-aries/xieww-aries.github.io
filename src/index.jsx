import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Head from './components/common/Header/index.jsx';

import Home from './components/home/index.jsx';
import List from './components/list/index.jsx';
import Doc from './components/doc/index.jsx';
import Intro from './components/intro/index.jsx';
import Login from './components/login/index.jsx';

class App extends Component {
    render() {
        return (
            <div>
                <Head />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/index" component={Home} />
                    <Route path="/list" component={List} />
                    <Route path="/document" component={Doc} />
                    <Route path="/introduce" component={Intro} />
                    <Route path="/loginRegiste" component={Login} />
                </Switch>
            </div>
        )
    }
}

ReactDom.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.querySelector('#app')
)

