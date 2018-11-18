import { createStore } from "redux";
import reducer from './userReducer.js';


let store = createStore(reducer);

export default store;
