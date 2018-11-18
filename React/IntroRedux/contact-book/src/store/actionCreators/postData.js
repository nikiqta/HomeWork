import {RECEIVE_CONTACT, AJAX_DATA} from './../actionTypes/actionTypes.js';
import {beginAjax, ajaxError} from './ajaxData.js';

function receiveContact(id, contact) {
    return {
        type: RECEIVE_CONTACT,
        id,
        contact
    };
}

export function updateContact(id, contact) {
    return (dispatch) => {
        dispatch(beginAjax());
        return fetch('http://localhost:4444/contacts/' + id,
            {
                method: 'POST',
                contentType: 'application/json',
                body: JSON.stringify(contact)
            })
            .then(() => {
                dispatch(receiveContact(id, contact));
            });

    }
}