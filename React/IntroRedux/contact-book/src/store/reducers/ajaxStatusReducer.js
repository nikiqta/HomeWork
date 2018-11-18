import {AJAX_BEGIN, AJAX_ERROR, AJAX_DATA} from './../actionTypes/actionTypes.js'


export default function (state = 0, action) {
    switch (action.type) {
        case AJAX_BEGIN:
            return state + 1;
        case AJAX_DATA:
        case AJAX_ERROR:
            return state - 1;
        default:
            return state;
    }
}