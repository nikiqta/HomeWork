import React from 'react';

import './House.css';

const House = (props) => {
    const { imageUrl } = props.data;
    return (
        <div className="House">
          <img
              onMouseEnter={() => {props.onClickHandler(props.id)}}
              alt="house image"
              src={imageUrl} />
        </div>
    );
};

export default House;