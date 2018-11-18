import * as actionTypes from './actionTypes.js';

// Action creators
export function increment() {
    return {
        type: actionTypes.ADD,
    }
}

export function decrement() {
    return {
        type: actionTypes.SUBTRACT,
    }
}

export function clear() {
    return {
        type: actionTypes.CLEAR_ALL
    }
}