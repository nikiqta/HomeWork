import React from 'react';

import './Street.css';

const Street = (props) => {

    const {location, id, onClickHandler, onHoverOutHandler } = props;
    return (
        <div
            id={id}
            className="streets"
            onMouseEnter={() => {
                onClickHandler(id)
            }}
        >
            <p>{location}</p>
        </div>
    );
};

export default Street;