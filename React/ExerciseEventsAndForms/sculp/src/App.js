import React, { Component } from 'react';
import './App.css';

import SingUpForm from './components/form/SingUpForm.js';
import LoginForm from './components/form/LoginForm.js';
import PokemonForm from './components/form/PokemonForm.js';

function WelcomePage(props) {
    let authToken = localStorage.getItem('authtoken');
    let username = localStorage.getItem('username');
    if (authToken === null) {
        return (
            <div>
                <SingUpForm />
                <LoginForm />
            </div>
        );
    }
    return (
        <div>
            <h1>Welcome {username}!</h1>
            <PokemonForm/>
        </div>
    );
}


class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      username: '',
      token: ''
    }
  }

  render () {
    return (
        <div>
        <WelcomePage/>
        </div>
    );
  }
}

export default App
