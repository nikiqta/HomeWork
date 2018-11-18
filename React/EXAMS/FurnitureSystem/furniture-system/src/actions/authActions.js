import {login, register} from "./../api/remote.js";
import {registerSuccess, loginSuccess} from "./actionCreators";

function registerThunk(name, email, password) {

    return (dispatch) => {
        return register(name, email, password)
            .then(json => {
                if(json.success){
               dispatch(registerSuccess());
                }
            });
    }
}

function loginThunk(email, password) {
       return (dispatch) => {
           return login(email, password)
               .then(json => {
                   localStorage.setItem('authToken', json.token);
                   localStorage.setItem('username', json.user.name);
                   dispatch(loginSuccess());
               });
       }
}

function logoutThunk() {
    return (dispatch) => {
        localStorage.clear();
    }
}

export {registerThunk, loginThunk, logoutThunk};