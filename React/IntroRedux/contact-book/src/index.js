import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import reducers from './store/reducers';
import fetchData from "./store/actionCreators/fetchData";
import '../node_modules/toastr/build/toastr.min.css';
import toastr from 'toastr';

const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk));

const p = store.dispatch(fetchData());
p.then(() => {
    toastr.success('Contacts Loaded')
});

ReactDOM.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    )
    , document.getElementById('root'));
registerServiceWorker();