import {fetchPage, fetchDetails, fetchSearchPage, createFurniture} from "../api/remote";
import {
    ajaxBegin, ajaxError,
    successPageFetch, successDetailsFetch,
    successSearchFetch, createFurnitureSuccess
} from "./actionCreators";


export function fetchPageThunk(page) {
    return async (dispatch) => {
        dispatch(ajaxBegin());
        try {
            const data = await fetchPage(page);
            dispatch(successPageFetch(data));
        } catch (error) {
            dispatch(ajaxError(error));
        }
    }
}

export function fetchDetailsThunk(id) {
    return async (dispatch) => {
        dispatch(ajaxBegin());
        try {
            const data = await fetchDetails(id);
            dispatch(successDetailsFetch([data]));
        } catch (error) {
            dispatch(ajaxError(error));
        }
    }
}

export function fetchSearchThunk(query, page) {
    return async (dispatch) => {
        dispatch(ajaxBegin());
        try {
            const data = await fetchSearchPage(query, page);
            dispatch(successSearchFetch(data));
        } catch (error) {
            dispatch(ajaxError(error));
        }
    }
}

export function createFurnitureThunk(item) {
    return async (dispatch) => {
        dispatch(ajaxBegin());
        try {
            const data = await createFurniture(item);
            dispatch(createFurnitureSuccess(data));
        } catch (err) {
            dispatch(ajaxError(err));
        }
    }
}