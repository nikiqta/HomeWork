import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// reducer
let reducer = (store, action) => {
    switch (action.type) {
        case ADD:
            const newData = store.slice();
            newData[Number(action.index)].value += 1;
            return newData;
        case SUBTRACT:
            const newArr = store.slice();
            newArr[Number(action.index)].value -= 1;
            return newArr;
        case CLEAR:
            const clearValue = store.slice();
            clearValue[Number(action.index)].value = 0;
            return clearValue;
        case ADD_COUNTER:
            return [...store, {index: store.length, value: 0}];
        case REMOVE_LAST:
            return [...store.slice(0, store.length - 1)];
        default:
            return store;
    }
};

let store = createStore(reducer);

// ActionTypes
const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';
const CLEAR = 'CLEAR';
const ADD_COUNTER = 'ADD_COUNTER';
const REMOVE_LAST = 'REMOVE_LAST';

// Action Creators
function increment(index) {
    return {
        type: ADD,
        index
    }
}

function decrement(index) {
    return {
        type: SUBTRACT,
        index
    }
}

function clear(index) {
    return {
        type: CLEAR,
        index
    }
}

function addCounter() {
    return {
        type: ADD_COUNTER
    }
}

function removeCounter() {
    return {
        type: REMOVE_LAST
    }
}

let Counter = ({props}) => {
    return (
        <div>
            <p>{props.value}</p>
            <button
                onClick={() => {
                    store.dispatch(increment(props.index));
                }}>Increment
            </button>
            <button
                onClick={() => {
                    store.dispatch(decrement(props.index));
                }}>Decrement
            </button>
            <button
                onClick={() => {
                    store.dispatch(clear(props.index));
                }}>Clear
            </button>
        </div>
    );
};

let CounterWrap = () => {
    return (
        <div id="counters">
            {store.getState() && store.getState().map((counter) => {
                return (
                    <Counter key={counter.index} props={counter}/>
                );
            })}
            <button
                onClick={() => {
                    store.getState() && store.dispatch(addCounter());
                }}
            >AddCounter
            </button>
            <button
                onClick={() => {
                    store.getState() && store.dispatch(removeCounter());
                }}
            >RemoveCounter
            </button>
        </div>
    )
};

store.subscribe(() => {
    ReactDOM.render(<CounterWrap/>, document.getElementById('root'))
});

ReactDOM.render(<CounterWrap/>, document.getElementById('root'));
registerServiceWorker();
