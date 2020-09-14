import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Head from './components/common/Header/index.jsx';

import Home from './pages/home/index.jsx';
import JsDoc from './pages/jsDoc/index.jsx';
import WebpackDoc from './pages/webpackDoc/index.jsx';
import ReactDoc from './pages/reactDoc/index.jsx';
import Game from './pages/Game/index.jsx';
import List from './pages/list/index.jsx';
import Interview from './pages/interview/index.jsx';

export default function App() {
    return (
        <div style={{ 'height': '100%' }}>
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

