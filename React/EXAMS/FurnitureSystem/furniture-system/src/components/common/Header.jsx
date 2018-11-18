import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';

export default class Header extends Component{

    render(){
        const {logout, items, users, loggedIn} = this.props;
        return (
            <header>
                <nav className="navbar navbar-dark bg-primary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <Link to="/" className="navbar-brand">FS</Link>
                                <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
                                {loggedIn && <NavLink to="/create" className="nav-link" activeClassName="active">Create Furniture</NavLink>}
                                {loggedIn && <NavLink to="/profile" className="nav-link" activeClassName="active">My Furniture</NavLink>}
                                {loggedIn && <a href="javascript:void(0)" className="nav-link" onClick={logout}>Logout</a>}
                                {!loggedIn && <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>}
                                {!loggedIn && <NavLink to="/register" className="nav-link" activeClassName="active">Register</NavLink>}
                                <span>{items} items in catalog</span> |
                                <span>{users} registered users</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}