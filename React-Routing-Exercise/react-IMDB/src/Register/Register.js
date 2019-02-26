import React, {Component} from 'react';
import './Register.css';

class Register extends Component {

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
                    <div className="Register"><h1>Register</h1>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            this.props.onRegisterSubmit(this.state);
                            this.props. history.push('/');
                        }}>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={this.state.username}
                                placeholder="Ivan Ivanov"
                                onChange={this.onInputChangeHandler}
                            />
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={this.state.email}
                                id="email"
                                placeholder="ivan@gmail.com"
                                onChange={this.onInputChangeHandler}
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                id="password"
                                placeholder="******"
                                onChange={this.onInputChangeHandler}
                            />
                            <input
                                type="submit"
                                value="REGISTER"
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;