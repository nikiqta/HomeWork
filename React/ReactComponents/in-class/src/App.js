import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Parent extends Component{
     constructor(props){
         super(props);
         this.state = {
             counter: 0
         };
         this.inc = () => {
             this.setState((prevState) => {return {counter: this.state.counter + 1}
             });
         }
     }

     render(){
         return (
             <div>
                 <h1>{this.state.counter}</h1>
                 <Child inc={this.inc} />
             </div>
         );
     }
}

class  Child extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (<button onClick={this.props.inc}>Click Me</button>);
    }
}

export default Parent;
