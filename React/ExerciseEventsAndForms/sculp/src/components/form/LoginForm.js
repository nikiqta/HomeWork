import React, { Component } from 'react'
import validationFunc from "../../utils/formValidator";
import Input from "./formFields/Input";

class LoginForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            confirmEmail: '',
            userName: '',
            password: '',
            confirmPassword: '',
            name: '',
            image: '',
            info: ''
        };
    }

    submitRegister(e) {
        e.preventDefault();
        let payload = {
            email: this.state.email,
            password: this.state.password,
        };
        this.login(payload)
    }

    login(payload){
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
            .then(d => {
                localStorage.setItem('authtoken', d.token);
                localStorage.setItem('username', d.user.name);
            });
    }

    render(){
        let validObj = validationFunc(
            this.state.email,
            this.state.confirmEmail,
            this.state.userName,
            this.state.password,
            this.state.confirmPassword,
            this.state.name,
            this.state.image,
            this.state.info
        );

        return(
            <form onSubmit={this.submitRegister.bind(this)}>
                <fieldset className='App'>
                    <div style={{ display: 'inline-grid' }}>
                        <h2>Login</h2>
                        <Input
                            type='text'
                            data='email'
                            name='Email'
                            func={e => {
                                this.setState({ email: e.target.value })
                            }}
                            valid={validObj.validMail}
                        />

                        <Input
                            type='password'
                            data='password'
                            name='Password'
                            func={e => {
                                this.setState({ password: e.target.value })
                            }}
                            valid={validObj.validPassword}
                        />

                        <input
                            style={({ "display": (validObj.validMail && validObj.validPassword) === true ? '' : 'none' })}
                            type='submit'
                            value='Login'
                        />
                    </div>
                </fieldset>
            </form>
        );
    }
}

export default LoginForm;