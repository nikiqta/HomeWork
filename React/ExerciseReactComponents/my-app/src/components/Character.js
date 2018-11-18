import React from 'react';
import observerMenu from './observer.js';

let Character = (props) => {
    return (
            <img onClick={() => observerMenu.executeObserver("changeFocus", {id:props.params.id})} alt='heroAvatar' className='heroes' src={props.params.url}/>
    );
};

export default Character;