import React, {Component} from 'react';
import './App.css';
import Slider from './components/Slider.js';
import Roster from './components/CharGenerator.js';
import Bio from './components/details.js';
import observerMenu from './components/observer.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedChar: 0
        };

        this.eventHandler = (newState) => {
            this.setState(newState);
        };
    }

    componentDidMount(){
        observerMenu.addObserver("changeFocus", this.eventHandler)
    }

    render() {
        return (
            <div className="App">
                {console.log(this.state)}
                <Slider/>
                <Roster/>
                <Bio params={({})}/>
            </div>
        );
    }
}

export default App;
