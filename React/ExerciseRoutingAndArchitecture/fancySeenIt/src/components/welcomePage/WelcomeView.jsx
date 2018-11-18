import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm.jsx';
import RegisterForm from "../forms/RegisterForm";

export default class Welcome extends Component{

    render(){
         return(
             <section id="viewWelcome">
                 <div className="welcome">
                     <div className="signup">
                         <LoginForm />
                         <RegisterForm />
                     </div>
                     <div className="about">
                         <h1>Welcome to SeenIt</h1>
                         <p>
                             Share interesting links and discuss great content. It's what's happening now.
                         </p>
                         <p>Sign in or sign up in a second.</p>
                     </div>
                 </div>
             </section>
         );
     }
}