import React from 'react';

 const Contact = (props) => {
     const { id, firstName, lastName } = props.data;
    return (
        <div className="contact" data-id={id} onClick={() => props.onClickHandler(id)}>
            <span className="avatar small">&#9787;</span>
            <span className="title">{firstName} {lastName}</span>
        </div>
    );
};

 export default Contact;
