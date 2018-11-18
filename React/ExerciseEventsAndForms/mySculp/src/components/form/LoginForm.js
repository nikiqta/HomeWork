import React, { Component } from 'react'
import Input from "./formFields/Input";
import validationFunc from './../../utils/formValidator'

export default class LoginForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            loginEmail: '',
            loginPassword: ''
        };

        this.submitLogin = this.submitLogin.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    submitLogin(e){
        console.log("submitted");
        e.preventDefault();

        let payload = {
            email: this.state.loginEmail,
            password: this.state.loginPassword,
        };
        this.signUp(payload);
    }

    signUp(payload) {
        fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                if (data){
                    this.props.authFunc(data);
                }
            })
    }

    render(){

        let validObj = validationFunc(
            this.state.email,
            this.state.confirmEmail,
            this.state.userName,
            this.state.password,
            this.state.confirmPassword,
            this.state.loginEmail,
            this.state.loginPassword
        );

        return(
            <form onSubmit={this.submitLogin}>
                <fieldset className='App'>
                    <div style={{display: 'inline-grid'}}>
                        <h2>Login form</h2>
                        <Input
                            type='text'
                            data='email'
                            name='Email'
                            func={e => {
                                this.setState({loginEmail: e.target.value})
                            }}
                            valid={validObj.validLoginEmail}
                        />
                        <Input
                            type='password'
                            data='password'
                            name='Password'
                            func={e => {
                                this.setState({loginPassword: e.target.value})
                            }}
                            valid={validObj.validLoginPassword}
                        />
                        <input
                            style={({"display": (validObj.validLoginEmail && validObj.validLoginPassword) === true ? '' : 'none'})}
                            type='submit'
                            value='Login'
                        />
                    </div>
                </fieldset>
            </form>
        );
    }
}