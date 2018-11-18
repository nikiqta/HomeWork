import {ajaxData, beginAjax, ajaxError} from "./ajaxData.js";
import toastr from 'toastr';

export default function fetchData() {
    return(dispatch) => {
        dispatch(beginAjax());
        return fetch('http://localhost:4444/contacts')
            .then(res => res.json(),
                error =>{
                toastr.error(error);
                    dispatch(ajaxError(error));
                })
            .then(data => dispatch(ajaxData(data)));
    }
}