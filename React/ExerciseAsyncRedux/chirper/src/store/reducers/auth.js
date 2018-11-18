import {LOGIN, REGISTER} from "../actionTypes/actionTypes";

export default (state = [], action) => {

    switch (action.type) {
        case LOGIN:
            return action.data;
        case REGISTER:
            return action.data;
        default:
            return state;
    }

}