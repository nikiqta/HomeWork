import React from 'react';

export default function Contact({firstName, lastName, selected, onClick}) {
    const style = {};

    if (selected){
        style.background = '#d59450';
        style.color = 'white';
    }

    return(
        <div
            className="contact"
            style={style}
            onClick={onClick}
        >
            <span className="avatar small">&#9787;</span>
            <span className="title">{firstName} {lastName}</span>
        </div>
    );
}