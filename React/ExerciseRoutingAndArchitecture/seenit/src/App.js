import React, { Component } from 'react';
import './App.css';

import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import Welcome from './components/welcomePage/WelcomeView.jsx'
import Home from "./components/homePage/Home";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authtoken: ''
        }
    }

    componentDidMount(){
         let authToken = localStorage.getItem('authtoken');
         if (authToken){
             this.setState({authtoken: authToken})
         }
    }

    render() {
    return (
        <div id="container">
            <div className="content">
                <Header username={localStorage.getItem('username')}/>
                {this.state.authtoken === '' ? <Welcome/> : <Home/>}
                <Footer />
            </div>
        </div>
    );
  }
}

export default App;
