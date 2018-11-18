import React, {Component} from 'react';
import Login from "./LoginPage";
import Register from "./RegisterPage";
import dataCollector from "../../utils/dataCollector";
import {connect} from 'react-redux';
import {fetchLogin} from "../../store/actionCreators/ajaxLogin";
import {fetchRegister} from "../../store/actionCreators/ajaxRegister";
import toastr from 'toastr';

class Auth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            login: true
        };

        this.dataCollector = this.dataCollector.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.loginState = this.loginState.bind(this);
    }


    dataCollector(e) {
        this.setState(dataCollector(e));
    }

    loginState() {
        this.setState({login: !this.state.login});
    }

    onSubmit(e) {
        e.preventDefault(e);
        if (e.target.name === "login") {
              if (this.state.username && this.state.password) {
                  const loginPromise =  this.props.login({
                      username: this.state.username,
                      password: this.state.password,
                  });

                  loginPromise.then(() => {
                      toastr.success('Login Successful!');
                  });
              } else {
                  toastr.error('Can not read from empty fields!');
              }


        } else if (e.target.name === "register") {
             if (this.state.username && this.state.password){
                 const registerPromise = this.props.register({
                     username: this.state.username,
                     password: this.state.password,
                     subscriptions: []
                 });

                 registerPromise.then(() => {
                     toastr.success('Register Successful!')
                 });
             } else {
                 toastr.error('Can not read from empty fields!');
             }

        }
    }

    render() {

        if (this.state.login) {
            return (<Login
                data={this.state}
                viewFunc={this.loginState}
                onSubmitForm={this.onSubmit}
                collectInputData={this.dataCollector}
            />);
        } else {
            return (<Register
                data={this.state}
                viewFunc={this.loginState}
                onSubmitForm={this.onSubmit}
                collectInputData={this.dataCollector}
            />);
        }
    }
}


function mapStateToProps(state) {
    return {
        appState: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (data) => dispatch(fetchLogin(data)),
        register: (data) => dispatch(fetchRegister(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

