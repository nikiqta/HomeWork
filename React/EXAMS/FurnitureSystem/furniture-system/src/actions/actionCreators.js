import {
    REGISTER_SUCCESS, LOGIN_SUCCESS,
    REDIRECTED, AJAX_BEGIN, AJAX_ERROR,
    FETCH_STATS_SUCCESS, FETCH_PAGE_SUCCESS,
    FETCH_DETAILS_SUCCESS, FETCH_SEARCH_SUCCESS,
    CREATE_FURNITURE_SUCCESS,
} from "./actionTypes";

export function registerSuccess() {
    return {
        type: REGISTER_SUCCESS,
    }
}

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS,
    }
}

export function redirect() {
    return {
        type: REDIRECTED
    }
}

export function ajaxBegin() {
    return {
        type: AJAX_BEGIN
    }
}

export function ajaxError(error) {
    return {
        type: AJAX_ERROR,
        error
    }
}

export function successStatsFetch(data) {
    return {
        type: FETCH_STATS_SUCCESS,
        data
    }
}

export function successPageFetch(data) {
    return {
        type: FETCH_PAGE_SUCCESS,
        data
    }
}

export function successDetailsFetch(data) {
    return {
        type: FETCH_DETAILS_SUCCESS,
        data
    }
}

export function successSearchFetch(data) {
    return {
        type: FETCH_SEARCH_SUCCESS,
        data
    }
}

export function createFurnitureSuccess(data) {
    return {
        type: CREATE_FURNITURE_SUCCESS,
        data
    }
}