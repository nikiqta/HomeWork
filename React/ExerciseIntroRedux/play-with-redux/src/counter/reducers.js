import * as actionTypes from './actionTypes.js';

// Reducer function
export default function reducer(store = 0, action) {
    switch (action.type) {
        case actionTypes.ADD: return ++store;
        case actionTypes.SUBTRACT: return --store;
        case actionTypes.CLEAR_ALL: return store = 0;
        default: return store;
    }
}