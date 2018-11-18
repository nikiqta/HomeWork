import React from 'react';
import SingUpForm from "./form/SingUpForm";
import LoginForm from "./form/LoginForm";
import PokemonForm from "./form/PokemonForm";

function WelcomePage (props) {
    let authToken = localStorage.getItem('token');
    let username = localStorage.getItem('username');
    if (authToken === null) {
        return (
            <div>
                <SingUpForm/>
                <LoginForm authFunc={props.authFunc}/>
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

export default WelcomePage;