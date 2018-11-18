import {ajaxBegin, ajaxError} from "./ajaxService";
import {register} from './actionCreators.js';
import {kinveyBaseUrl, kinveyAppKey, kinveyAppSecret} from './../../kinveyDetails/details.js';
import toastr from 'toastr';

export function fetchRegister(inputData) {
    return (dispatch) => {
        dispatch(ajaxBegin());
        return fetch(`${kinveyBaseUrl}user/${kinveyAppKey}`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
        })
            .then(res =>res.json(),
                error => {
                    toastr.error(error);
                    dispatch(ajaxError(error));
                }
            ).then(data => dispatch(register(data)));
    }
}
