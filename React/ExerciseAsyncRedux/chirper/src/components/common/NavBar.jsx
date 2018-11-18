import React from 'react';
//import {Router, Link} from 'react-router-dom';

export default function NavBar(props) {
    return(
        <div className="menu">
            <a href="#">Home</a>
            <a href="#">Discover</a>
            <a href="#">Me</a>
            <a href="#">Logout</a>
        </div>
    );

}