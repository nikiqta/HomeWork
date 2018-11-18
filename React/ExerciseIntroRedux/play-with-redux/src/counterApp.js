import {createStore} from "redux";
import calculator from "./counter/reducers.js";
import comments from './comments/commentReducer.js';
import { combineReducers } from 'redux';

let store = createStore(combineReducers({
    calculator,
    comments
}),{
    calculator: 0,
    comments: [
        'First Comment',
        'Second Comment',
        'Third Comment']
});

export default store;