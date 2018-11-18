import * as actionTypes from './actionTypes.js';

export function addComment(text) {
    return {
        type: actionTypes.ADD_COMMENT,
        text
    }
}