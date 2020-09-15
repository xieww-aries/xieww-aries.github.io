import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Head from './components/common/Header';

import Home from './pages/home';
import JsDoc from './pages/jsDoc';
import WebpackDoc from './pages/webpackDoc';
import ReactDoc from './pages/reactDoc';
import Game from './pages/Game';
import List from './pages/list';

import Interview from './pages/interview';

export default function App() {
    return (
        <div>
            <Head />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/index" component={Home} />
                <Route path="/js" component={JsDoc} />
                <Route path="/webpack" component={WebpackDoc} />
                <Route path="/react" component={ReactDoc} />
                <Route path="/interview" component={Interview} />
                <Route path="/list" component={List} />
                <Route path="/game" component={Game} />
            </Switch>
        </div>
    )
}

ReactDom.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.querySelector('#app')
)

