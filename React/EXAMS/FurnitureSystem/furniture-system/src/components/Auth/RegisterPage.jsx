import React, {Component} from 'react';
import Input from "./Input";
import {loginThunk, registerThunk} from './../../actions/authActions.js';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {redirect} from './../../actions/actionCreators.js';

class RegisterPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            repeatPass: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmitHandler(e) {
        e.preventDefault(e);
        this.props.register(this.state.name, this.state.email, this.state.password);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.registerSuccess) {
            this.props.login(this.state.email, this.state.password)
        } else if(nextProps.loginSuccess){
            this.props.redirect();
            this.props.history.push("/");
        }
    }

    render() {

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Register</h1>
                        <p>Please fill all fields.</p>
                    </div>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="row space-top">
                        <div className="col-md-4">
                            <Input
                                onChange={this.onChangeHandler}
                                name="name"
                                value={this.state.name}
                                label="Name"
                            />
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
                            <Input
                                onChange={this.onChangeHandler}
                                name="repeatPass"
                                type="password"
                                value={this.state.repeatPass}
                                label="Repeat Password"
                            />
                            <input type="submit" className="btn btn-primary" value="Register"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        registerSuccess: state.register.success,
        loginSuccess: state.login.success
    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (name, email, password) => dispatch(registerThunk(name, email, password)),
        login: (email, password) => dispatch(loginThunk(email, password)),
        redirect: () => dispatch(redirect())
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterPage));