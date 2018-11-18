import React, {Component} from 'react';
import dataCollector from '../../utils/dataCollector';
import reqHandler from "../../utils/requestHandler";
import LoaderButton from "../fancyStuff/LoaderButton";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.dataCollector = this.dataCollector.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    dataCollector(e){
        this.setState(dataCollector(e));
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({loading:true});
        reqHandler.login(this.state).then(response => {
            localStorage.setItem('authtoken', response._kmd.authtoken);
            localStorage.setItem('username', response.username);
            localStorage.setItem('userId', response._id);
            this.setState({loading:false});
            window.location.reload();
        });
    }

    render() {
        return (
            <form id="loginForm" onSubmit={this.onSubmit}>
                <h2>Sign In</h2>
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

                <LoaderButton
                    block
                    bsSize="large"
                    disabled={this.state.loading}
                    type="submit"
                    isLoading={this.state.loading}
                    text="Login"
                    loadingText="Logging in…"
                />
            </form>
        );
    }
}