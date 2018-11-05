import {fetchStats} from "../api/remote";
import {ajaxBegin, successStatsFetch} from "./actionCreators";


export function fetchStatsThunk() {
    return async (dispatch) => {
        dispatch(ajaxBegin());
        const data = await fetchStats();
        dispatch(successStatsFetch(data));
    }
}
