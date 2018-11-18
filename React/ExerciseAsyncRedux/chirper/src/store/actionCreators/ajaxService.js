import {AJAX_DATA, AJAX_BEGIN, AJAX_ERROR} from './../actionTypes/actionTypes.js';



export function ajaxLogin(data) {
    return {
        type: AJAX_DATA,
        data
    }
}

export function ajaxRegister(data) {
    return {
        type: AJAX_DATA,
        data
    }
}
export function ajaxBegin() {
    return {
        type: AJAX_BEGIN,
    }
}
export function ajaxError(error) {
    return {
        type: AJAX_ERROR,
        error
    }
}