import React, { Component } from 'react';
import {Link} from "react-router-dom";

const Header = (props) => {
    const { loggedIn, logout } = props;
    const adminPermissions = localStorage.getItem('admin');
    const username = localStorage.getItem('username');

    return (
        <header>
            {<Link className="link" to="/">Home</Link>}
            {!loggedIn && <Link className="link" to="/register">Register</Link>}
            {!loggedIn && <Link className="link" to="/login">Login</Link>}
            {adminPermissions == 'true' && <Link className="link" to="/create/movie">Create Movie</Link>}
            {loggedIn && <Link className="link" to="/">Movies</Link>}
            {loggedIn && <Link className="link-greeting" to="#">Welcome {username}!</Link>}
            {loggedIn && <Link className="link-logout" to="javascript:void(0)" className="nav-link"
                               onClick={logout}>Logout</Link>}
        </header>
    );
};

export default Header;