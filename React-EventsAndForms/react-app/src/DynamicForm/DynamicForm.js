import React from "react";
import RegisterForm from "./RegisterForm";
import LogInForm from "./LoginForm";
import CreateForm from "../Games/CreateForm";

class DynamicForm extends React.Component {

    render() {
        const {loginForm, user, registerUser, loginUser, createGame} = this.props;
        return (
            <div>
                <div>
                    {!loginForm && !user && <RegisterForm
                        onRegisterSubmit={registerUser}/>}
                    {loginForm && !user && <LogInForm
                        onLoginSubmit={loginUser}
                    />}
                    {user && <CreateForm onCreateSubmit={createGame}/>}
                </div>
            </div>
        )
    }
}

export default DynamicForm