import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import ToggleButton from './components/toggleButton.jsx';
import FocusDiv from './components/FocusDiv.jsx';
import Form from './components/Form/Form.jsx';
import Converter from './components/Converter/Converter.jsx';
import List from './components/Form/List.jsx';

class App extends Component {
    render() {
        return (
            <div className="App">
                <List>
                    {["Pesho", "Gosho", "Vasil", "Maria"].map((u, i) => {
                       return (<li key={u}>{u}</li>);
                })}
                </List>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <ToggleButton/>
                <Converter/>
                <Form/>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                {[1, 2, 3, 4].map((n, i) => {
                    return (<FocusDiv key={i} number={n}>
                            <p>I made this</p>
                            </FocusDiv>);
                })}
            </div>
        );
    }
}

export default App;
