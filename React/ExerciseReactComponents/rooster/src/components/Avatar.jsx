import React from 'react';

export default function Avatar(props) {

    if (props.value) {
        return(
            <li>
                <img className="avatarPics" alt="Characters" src={props.value.url} onClick={props.onClick}/>
            </li>
        );
    }

    return null;
}