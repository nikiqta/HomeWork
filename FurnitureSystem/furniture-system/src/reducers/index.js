import { loginReducer, registerReducer } from "./authReducer.js";
import statsReducer from './statsReducer.js';
import furnitureReducer from './furnitureReducer.js'

export default {
    register: registerReducer,
    login: loginReducer,
    stats: statsReducer,
    furniture: furnitureReducer
};