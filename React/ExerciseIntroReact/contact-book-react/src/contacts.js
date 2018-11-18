import React, { Component } from 'react';


function makeContacts(contact, id, clickHandler){
   return (
       <div className="contact" data-id={id} onClick={() => clickHandler(id)}>
            <span className="avatar small">&#9787;</span>
            <span className="title">{contact.firstName} {contact.lastName}</span>
       </div>
   );

}

export default makeContacts;