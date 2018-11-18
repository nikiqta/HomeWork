import * as actionTypes from "./actionTypes";

export default function reducer(store, action) {
    switch (action.type) {
        case actionTypes.ADD_INPUT:
            if (store) {
                return [...store, {index: store.length, text: action.text}];
            } else {
                return [{index: 0, text: action.text}];
            }
        case actionTypes.EDIT_INPUT:
            const newState = store.slice();
            newState[action.index] = {index: action.index, text: action.text};
            return newState;
        case actionTypes.DELETE_LAST:
            const copyStore = store.slice(0, store.length - 1);

            return copyStore;
        default:
            return store;
    }
}