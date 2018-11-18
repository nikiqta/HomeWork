import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import makeApp from './App';
import registerServiceWorker from './registerServiceWorker';

function clickHandler(id){
    const app = makeApp(clickHandler, id);
    ReactDOM.render(app, document.getElementById('root'));
}

clickHandler(0);
registerServiceWorker();
