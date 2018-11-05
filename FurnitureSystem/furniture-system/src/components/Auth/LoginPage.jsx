import React, {Component} from 'react';
import Input from "./Input";
import {loginThunk} from './../../actions/authActions.js';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {redirect} from './../../actions/actionCreators.js';

class LoginPage extends Component{

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmitHandler(e) {
        e.preventDefault(e);
        this.props.login(this.state.email, this.state.password);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.loginSuccess) {
            this.props.redirect();
            this.props.history.push("/");
            this.props.login(this.state.email, this.state.password)
        }
    }


    render(){

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Login</h1>
                    </div>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="row space-top">
                        <div className="col-md-4">
                            <Input
                                onChange={this.onChangeHandler}
                                name="email"
                                value={this.state.email}
                                label="E-mail"
                            />
                            <Input
                                onChange={this.onChangeHandler}
                                name="password"
                                type="password"
                                value={this.state.password}
                                label="Password"
                            />
                            <input type="submit" className="btn btn-primary" value="Login"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loginSuccess: state.login.success
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (email, password) => dispatch(loginThunk(email, password)),
        redirect: () => dispatch(redirect())
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));