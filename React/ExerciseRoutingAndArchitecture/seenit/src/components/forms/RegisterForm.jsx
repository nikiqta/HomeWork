import React, {Component} from 'react';
import dataCollector from "../../utils/dataCollector";
import reqHandler from "../../utils/requestHandler";

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.dataCollector = this.dataCollector.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    dataCollector(e){
        this.setState(dataCollector(e));
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({loading:true});
        reqHandler.register(this.state).then(response => {
            localStorage.setItem('authtoken', response._kmd.authtoken);
            localStorage.setItem('username', response.username);
            localStorage.setItem('userId', response._id);
            this.setState({loading:false});
            window.location.reload();
        });
    }

    render() {
        return (
            <form id="registerForm" onSubmit={this.onSubmit}>
                <h2>Register</h2>
                <label>Username:</label>
                <input
                    onChange={(e) => {this.dataCollector(e)}}
                    name="username"
                    type="text"/>
                <label>Password:</label>
                <input
                    onChange={(e) => {this.dataCollector(e)}}
                    name="password"
                    type="password"/>
                <label>Repeat Password:</label>
                <input
                    onChange={(e) => {this.dataCollector(e)}}
                    name="repeatPass"
                    type="password"/>
                <input id="btnRegister" value="Sign Up" type="submit"/>
            </form>
        );
    }
}