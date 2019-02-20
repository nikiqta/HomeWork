import React from 'react';
import './login.css';

class LogInForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="Login">
                <h1>Login</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onLoginSubmit(this.state);
                }}>
                    <label>Usersname</label>
                    <input
                        type="text"
                        name="username"
                        id="usernameLogin"
                        value={this.state.username}
                        onChange={this.onChangeHandler}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="passwordLogin"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                    />
                    <input
                        type="submit"
                        value="Login"/>
                </form>
            </div>
        )
    }
}

export default LogInForm;
