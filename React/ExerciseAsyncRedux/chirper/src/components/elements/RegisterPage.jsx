import React from 'react';

export default function Register(props) {
    return (
        <section id="viewRegister">
            <div className="content">
                <form
                    className="form"
                    id="formRegister"
                    name="register"
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
                    <label>Repeat Password</label>
                    <input
                        onChange={(e) => {props.collectInputData(e)}}
                        name="repeatPass"
                        type="password"
                    />
                    <input
                        id="btnRegister"
                        value="Register"
                        type="submit"/>
                    <button
                        onClick={() => {props.viewFunc()}}
                    >Log in</button>
                </form>
            </div>
        </section>
    );
}