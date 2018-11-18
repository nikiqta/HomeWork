import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from 'redux-thunk';
import reducers from './reducers';
//import toastr from 'toastr';

const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk));

export default store;