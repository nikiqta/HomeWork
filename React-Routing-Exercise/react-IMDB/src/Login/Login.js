import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.onInputChangeHandler = this.props.onInputChangeHandler.bind(this);
    }

    render() {
        return (
            <div id="root">
                <div className="App">
                    <div className="Login"><h1>Login</h1>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            this.props.onLoginSubmit(this.state);
                            this.props. history.push('/');
                        }}>
                            <label htmlFor="usernameLogin">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={this.state.username}
                                id="username"
                                placeholder="Ivan Ivanov"
                                onChange={this.onInputChangeHandler}
                            />
                            <label htmlFor="passwordLogin">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                id="passwordLogin"
                                placeholder="******"
                                onChange={this.onInputChangeHandler}
                            />
                            <input
                                type="submit"
                                value="Login"
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
