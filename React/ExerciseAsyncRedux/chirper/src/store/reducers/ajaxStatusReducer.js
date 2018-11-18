import {AJAX_BEGIN} from './../actionTypes/actionTypes.js'
import {LOGIN, REGISTER} from './../actionTypes/actionTypes.js';

export default function (state = 0, action) {
    switch (action.type) {
        case AJAX_BEGIN:
            return state + 1;
        case LOGIN:
        case REGISTER:
            return state - 1;
        default:
            return state;
    }
}