import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const reducer = (state = '', action) => {
    switch (action.type) {
        case 'GOT_DATA':
            return action.data;
        default:
            return state;
    }
};

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

function getData() {
    return (dispatch) => {
        return fetch('http://localhost:4444/contacts')
            .then(res => {
                return res.json();
            })
            .then(data => {
                dispatch({type: 'GOT_DATA', data});
            });
    }
}

store.dispatch(getData());

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
