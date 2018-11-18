import React, { Component } from 'react';
import './App.css';
import Signup from "./components/SignupForm";
import NewNote from "./components/NewNote";

class App extends Component {
  render() {
    return (
      <div>
       <Signup/>
        <NewNote/>
      </div>
    );
  }
}

export default App;
