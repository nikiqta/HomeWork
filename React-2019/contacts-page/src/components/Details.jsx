import React from 'react';

const Details = (props) => {
    const { firstName, lastName, phone, email } = props.data;
    return (
        <div className="content">
            <div className="info">
                <div className="col">
                    <span className="avatar">&#9787;</span>
                </div>
                <div className="col">
                    <span className="name">{firstName}</span>
                    <span className="name">{lastName}</span>
                </div>
            </div>
            <div className="info">
                <span className="info-line">&#9742; {phone}</span>
                <span className="info-line">&#9993; {email}</span>
            </div>
        </div>
    );
};

export default Details;