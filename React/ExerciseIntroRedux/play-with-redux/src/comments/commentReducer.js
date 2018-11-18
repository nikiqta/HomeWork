import * as actionTypes from './actionTypes.js';

export default function commentsReducer(state = [], action) {
    switch (action.type) {
        case actionTypes.ADD_COMMENT:
            const newState = state.slice();
            newState.push(action.text);
          return newState;
        default: return state
    }
}