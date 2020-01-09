import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/home/index.jsx';
import List from './components/list/index.jsx';
import Doc from './components/doc/index.jsx';
import Intro from './components/intro/index.jsx';
import Header from './components/common/Header/index.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/index" component={Home} />
                    <Route path="/list" component={List} />
                    <Route path="/document" component={Doc} />
                    <Route path="/introduce" component={Intro} />
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

