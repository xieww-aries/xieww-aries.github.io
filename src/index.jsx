import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route, IndexRoute } from 'react-router-dom';

import Head from './components/common/Header/index.jsx';

import Home from './pages/home/index.jsx';
import List from './pages/list/index.jsx';
import ArrayDoc from './pages/array/index.jsx';
import Intro from './pages/intro/index.jsx';
import Login from './pages/login/index.jsx';

class App extends Component {
    render() {
        return (
            <div>
                <Head />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/index" component={Home} />
                    <Route path="/list" component={List} />
                    <Route path="/array" component={ArrayDoc} />
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

