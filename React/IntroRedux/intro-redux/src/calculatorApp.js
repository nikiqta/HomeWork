import { createStore, combineReducers } from 'redux';
import calculator from './calculator/calculatorReducers';
import comments from './comments/commentReducer.js';

const store = createStore(combineReducers({
    calculator,
    comments
}),
    {
        calculator: 11,
        comments: ["Works well!", "Good job!", "Awesome app!"]
    });


export default store;