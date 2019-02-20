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
        this.logout = this.logout.bind(this);
        this.createGame = this.createGame.bind(this);
        this.switchForm = this.switchForm.bind(this);
        this.authentication = this.authentication.bind(this);
        this.getGames = this.getGames.bind(this);
    }

    authentication(data) {
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            this.setState({user: data.username});
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

    async getGames() {
        await fetch('http://localhost:9999/feed/games', {
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
        this.setState({user: null});
    }

    async componentDidMount() {
        const username = localStorage.getItem('username');
        if (!localStorage.getItem('token')) {
            this.setState({user: null});
        } else {
            this.setState({user: username});
        }

        this.getGames();
    }

    async createGame(data) {
        await fetch('http://localhost:9999/feed/game/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                return res.json()
            })
            .then(() => {
                this.getGames();
            })
            .catch(err => console.log(err));
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


