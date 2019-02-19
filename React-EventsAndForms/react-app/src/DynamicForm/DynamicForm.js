import React from "react";
import RegisterForm from "./RegisterForm";
import LogInForm from "./LoginForm";
import CreateForm from "../Games/CreateForm";

class DynamicForm extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        const { loginForm } = this.props;
        console.log(this.props);
        return (
            <div>
                <div>
                    {loginForm ? <LogInForm
                    onLoginSubmit={this.props.loginUser}
                    /> : <RegisterForm
                      onRegisterSubmit={this.props.registerUser}  />}
                </div>
            </div>
        )
    }
}

export default DynamicForm