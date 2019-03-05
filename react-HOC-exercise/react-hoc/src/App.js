import React, { Component, Fragment } from 'react';

import Register from './components/Register';
import Navigation from './components/Navigation';
import ArticleTitle from './components/ArticleTitle';
import BindingForm from './components/BindingFrom';

import warningWrapper from './hocs/WarningWrapper';
import errorHandlingWrapper from './hocs/errorHandlingWrapper';

import './App.css';

const ArticleWithWarning = warningWrapper(errorHandlingWrapper(ArticleTitle));
const RegisterWithWarning = warningWrapper(errorHandlingWrapper(Register));
const NavigationWithWarning = warningWrapper(errorHandlingWrapper(Navigation));

class App extends Component {
  onSubmit() {}

  render() {
    return (
      <Fragment>
        <BindingForm onSubmit={this.onSubmit}>
          <h1>Register Form</h1>
          <input type="text" name="username" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
        </BindingForm>
        <BindingForm onSubmit={this.onSubmit}>
          <h1>Login Form</h1>
          <input type="text" name="username" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
        </BindingForm>
        <ArticleWithWarning />
        <RegisterWithWarning />
        <NavigationWithWarning />
      </Fragment>
    );
  }
}

export default App;
