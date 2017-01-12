import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import Breathe from './containers/Breathe'

const store = configureStore()
window.NODE_ENV = process.env.NODE_ENV

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Breathe}></Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
