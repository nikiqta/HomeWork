import React, {Component} from 'react';

import './HouseDetails.css';

const HouseDetails = (props) => {
    const { imageUrl, description, price, type } = props.data;
    return (
        <div className="HouseDetails">
            <h2>{type}</h2>
            <div className="image">
                <img alt="house view" src={imageUrl} />
            </div>
            <p>Description: {description}</p>
            <p>Price: {price}</p>
        </div>
    );
};

export default HouseDetails;
