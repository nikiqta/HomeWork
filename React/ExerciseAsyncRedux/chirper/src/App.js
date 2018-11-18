import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import NavBar from "./components/common/NavBar";
import ElementBlender from "./components/elements";
import Preloader from "./components/preloader/Preloader";

class App extends Component {

    render() {
    return (
        <div id="main">
            <div className="App">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <Preloader/>
            <Header/>
            <NavBar/>
            <ElementBlender/>
            <Footer/>
        </div>
    );
  }
}

export default App;
