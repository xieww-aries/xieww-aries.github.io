import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route, IndexRoute } from 'react-router-dom';

import Head from './components/common/Header/index.jsx';

import Home from './pages/home/index.jsx';
import ArrayDoc from './pages/arrayDoc/index.jsx';
import WebpackDoc from './pages/webpackDoc/index.jsx';
import ReactDoc from './pages/reactDoc/index.jsx';
import List from './pages/list/index.jsx';

class App extends Component {
    render() {
        return (
            <div>
                <Head />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/index" component={Home} />
                    <Route path="/array" component={ArrayDoc} />
                    <Route path="/webpack" component={WebpackDoc} />
                    <Route path="/react" component={ReactDoc} />
                    <Route path="/list" component={List} />
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

