import React, {Component} from 'react';
import {Link, Route, Switch, Redirect} from "react-router-dom";
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Create from './Create/Create';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: '',
            loggedIn: localStorage.getItem('token'),
            isAdmin: false,
            movies: []
        };

        this.registerUser = this.registerUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logout = this.logout.bind(this);
        this.authentication = this.authentication.bind(this);
    }

    authentication(data) {
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('admin', data.isAdmin);
            this.setState({
                user: data.username,
                userId: data.userId,
                loggedIn: true,
                isAdmin: data.isAdmin,
                movies: []
            });
        }
    }

    async registerUser(payload) {
        await fetch('http://localhost:9999/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.loginUser({
                    username: payload.username,
                    password: payload.password
                })
            })
            .catch(err => console.log(err));
    }

    async loginUser(payload) {
        await fetch('http://localhost:9999/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then((data) => {
                this.authentication(data);
            })
            .catch(err => console.log(err));
    }

    logout(e) {
        e.preventDefault();
        localStorage.clear();
        this.setState({
            user: null,
            userId: null,
            loggedIn: false,
            isAdmin: false
        });
    }

    render() {
        const { loggedIn } = this.state;
        const adminPermissions = localStorage.getItem('admin');
        const username = localStorage.getItem('username');
        return (
            <div className="App">
                <header>
                    {<Link class="link" to="/">Home</Link>}
                    {!loggedIn && <Link class="link" to="/register">Register</Link>}
                    {!loggedIn && <Link class="link" to="/login">Login</Link>}
                    {adminPermissions == 'true' && <Link class="link" to="/create/movie">Create Movie</Link>}
                    {loggedIn && <Link class="link" to="/">Movies</Link>}
                    {loggedIn && <Link class="link-greeting" to="#">Welcome {username}!</Link>}
                    {loggedIn && <Link class="link-logout" to="javascript:void(0)" className="nav-link" onClick={this.logout}>Logout</Link>}
                </header>

                <Switch>
                    <Route exact path="/" render={(props) =>
                               <Home {...props}  data={this.state}/>}
                    />
                    <Route path="/register" render={(props) =>
                            <Register{...props} onRegisterSubmit={this.registerUser}/>}
                    />
                    <Route path="/login" render={(props) =>
                        <Login{...props} onLoginSubmit={this.loginUser}/>}
                    />
                    <Route path="/create/movie" component={Create}/>
                </Switch>
            </div>
        );
    }
}

export default App;

/*
                                <Link to="/" className="navbar-brand">FS</Link>
                                <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
                                {loggedIn && <NavLink to="/create" className="nav-link" activeClassName="active">Create Furniture</NavLink>}
                                {loggedIn && <NavLink to="/profile" className="nav-link" activeClassName="active">My Furniture</NavLink>}
                                {loggedIn && <a href="javascript:void(0)" className="nav-link" onClick={logout}>Logout</a>}
                                {!loggedIn && <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>}
                                {!loggedIn && <NavLink to="/register" className="nav-link" activeClassName="active">Register</NavLink>}

 */


