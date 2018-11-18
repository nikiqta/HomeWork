import React from 'react';

export default function Login(props) {
    return (
        <section id="viewLogin">
            <div className="content">
                <form
                    id="formLogin"
                    className="form"
                    name="login"
                    onSubmit={(e) => {props.onSubmitForm(e)}}
                >
                    <label>Username</label>
                    <input
                        onChange={(e) => {props.collectInputData(e)}}
                        name="username"
                        type="text"
                    />
                    <label>Password</label>
                    <input
                        onChange={(e) => {props.collectInputData(e)}}
                        name="password"
                        type="password"
                    />
                    <input id="btnLogin"
                           value="Sign In"
                           type="submit"/>
                    <button
                         onClick={() => {props.viewFunc()}}
                    >Register</button>
                </form>
            </div>
        </section>
    );
}