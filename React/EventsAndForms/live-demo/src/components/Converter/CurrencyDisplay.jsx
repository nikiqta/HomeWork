import React from 'react';

let CurrencyDisplay = (props) =>  {
    return (
        <div>
            <label>
                {props.name.toUpperCase()}
                <input
                    onChange={props.onChange}
                    type="number"
                    name={props.name}
                    value={props.value}
                />
            </label>
        </div>
    );
};

export default CurrencyDisplay;