import React from 'react';
import './register.css';

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            username: '',
            email: '',
            password: ''
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="Register">
                <h1>Sign Up</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onRegisterSubmit(this.state)
                }}>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        id="usernameReg"
                        value={this.state.username}
                        onChange={this.onChangeHandler}
                    />
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        id="emailReg"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="passwordReg"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                    />
                    <input type="submit" value="Sign Up"/>
                </form>
            </div>
        )
    }
}
export default RegisterForm;