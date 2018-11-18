import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
    }

    componentWillMount(){
        console.log('I"m the first hoook')
    }


    updateCount() {
        this.setState(prevState => ({ count: this.state.count + 1 }));
    }
    render() {
        return (<button onClick={this.updateCount.bind(this)}>
            Clicked {this.state.count} times</button>);
    }
}

export default Button;
