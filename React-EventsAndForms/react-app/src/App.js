import React, {Component} from 'react';
import './App.css';
import AppHeader from "./App/AppHeader";
import AppContent from "./App/AppContent";
import AppFooter from "./App/AppFooter";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            games: [],
            hasFetched: false,
            loginForm: false,
        };

        this.registerUser = this.registerUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logout = this.loginUser.bind(this);
        this.createGame = this.createGame.bind(this);
        this.switchForm = this.switchForm.bind(this);
        this.authentication = this.authentication.bind(this);
    }

    authentication(data) {
        if (data.token) {
            this.setState({user: data.username});
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username)
        }
    }

 async   registerUser(payload) {
      await  fetch('http://localhost:9999/auth/signup', {
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
        // TODO: register a user and login
    }

 async   loginUser(payload) {
      debugger;
     await   fetch('http://localhost:9999/auth/signin', {
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
        // TODO: login a user and set sessionStorage items username and token
    }

    logout(e) {
        debugger;
        // TODO: prevent the default state
        e.preventDefault();
        // TODO: delete the data from the sessionStorage
        localStorage.clear();
        // TODO: update the state (user: null)
        this.setState({user: null});
    }

    componentWillMount() {

        // TODO: check if there is a logged in user using the sessionStorage (if so, update the state, otherwise set the user to null)
        if(!localStorage.getItem('token')){
            this.setState({user: null});
        }
        // TODO: fetch all the games
        fetch('http://localhost:9999/feed/games',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({games: data.games});
            })
            .catch(err => console.log(err));
    }

    createGame(data) {
        // TODO: create a game using fetch with a post method then fetch all the games and update the state 
    }

    switchForm(e) {
        this.setState(prevState => ({loginForm: !prevState.loginForm}));
    }

    render() {
        return (
            <main>
                <AppHeader
                    user={this.state.user}
                    logout={this.logout}
                    switchForm={this.switchForm}
                    loginForm={this.state.loginForm}
                />
                <AppContent
                    registerUser={this.registerUser}
                    loginUser={this.loginUser}
                    games={this.state.games}
                    createGame={this.createGame}
                    user={this.state.user}
                    loginForm={this.state.loginForm}
                />
                <AppFooter/>
            </main>
        )
    }
}

export default App;


