import React, {Component} from 'react';
import {Link, Route, Switch, Redirect} from "react-router-dom";
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Create from './Create/Create';

import {ToastContainer, toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from "./Header/Header";

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
        this.notify = this.notify.bind(this);
    }

    onInputChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    notify(message, type) {
        toast[type](message, {
            closeButton: false,
            position: 'top-center'
        });
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
                if (data.username) {
                    this.notify(data.message, 'success');
                    this.loginUser({
                        username: payload.username,
                        password: payload.password
                    });
                } else {
                    this.notify(data.message, 'error');
                }
            })
            .catch(err =>  this.props.notify(err.message, 'error'));
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
                if (data.token) {
                    this.notify(data.message, 'success');
                    this.authentication(data);
                } else {
                    this.notify(data.message, 'error');
                }
            })
            .catch(err =>  this.props.notify(err.message, 'error'));
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
        return (
            <div className="App">
                <Header
                    loggedIn={this.state.loggedIn}
                    logout={this.logout}
                />
                <ToastContainer/>
                <Switch>
                    <Route exact path="/" render={(props) =>
                        <Home {...props} notify={this.notify} data={this.state}/>}
                    />
                    <Route path="/register" render={(props) =>
                        <Register{...props} onRegisterSubmit={this.registerUser}
                                 onInputChangeHandler={this.onInputChangeHandler}
                        />}
                    />
                    <Route path="/login" render={(props) =>
                        <Login{...props} onLoginSubmit={this.loginUser}
                              onInputChangeHandler={this.onInputChangeHandler}
                        />}
                    />
                    <Route path="/create/movie" render={(props) => <Create
                        {...props}
                        notify={this.notify}
                        onInputChangeHandler={this.onInputChangeHandler}
                    />}/>
                </Switch>
            </div>
        );
    }
}

export default App;


