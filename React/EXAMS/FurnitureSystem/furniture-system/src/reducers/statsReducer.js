import {FETCH_STATS_SUCCESS} from "../actions/actionTypes";

export default function statsReducer(state = {users: 0, furniture: 0}, action) {
    switch (action.type) {
        case FETCH_STATS_SUCCESS:
           return {
               users: action.data.users,
               furniture: action.data.furniture
           };
        default:
            return state;
    }
}