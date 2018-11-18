import React from 'react';

export default function PresentView(props) {

    if (props.value) {
        return (
            <div>
                <article>
                    <img className="avatarPics" alt="Characters" src={props.value.url}/>
                    <p>{props.value.bio}</p>
                </article>
            </div>
        )
    }

    return null;
}