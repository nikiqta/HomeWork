import React, { Component } from 'react';
import './Register.css';

class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
          username: '',
          email: '',
          password: ''
    }
    this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
  }

  onInputChangeHandler(e) {
      this.setState({[e.target.name]: e.target.value});
  }


  render() {
  
    return (
      <div className="Register">
         <form
         onSubmit={(e) => {
           e.preventDefault();
        }}
         >
           <input 
           type="text"
           name="username"
           value={this.state.username}
           onChange={this.onInputChangeHandler}
           />
         </form>
      </div>
    );
  }
}

export default Register;
