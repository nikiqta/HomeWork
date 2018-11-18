import React from 'react';
import ReactDOM from 'react-dom';
import './style/bootstrap.min.css';
import './style/site.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import reducers from './reducers';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from "redux-thunk";
import {Provider} from 'react-redux';

const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk));

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
