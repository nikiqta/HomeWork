import * as types from './actionTypes.js';

function addComment(text) {
    return{
        type: types.ADD_COMMENT,
        text
    }
}