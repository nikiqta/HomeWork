import * as actionTypes from './actionTypes.js';

export function add(text) {
    return {
        type: actionTypes.ADD_INPUT,
        text
    }
}

export function edit(text, index) {
    return {
        type: actionTypes.EDIT_INPUT,
        text,
        index
    }
}

export function deleteLast() {
    return {
        type: actionTypes.DELETE_LAST,
    }
}