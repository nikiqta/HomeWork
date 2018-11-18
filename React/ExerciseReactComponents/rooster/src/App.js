import React, {Component} from 'react';
import './App.css';

import Slider from './components/Slider.jsx';
import Character from './components/Character.jsx';
import PresentView from "./components/PresentView.jsx";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            epOnFocus: 0,
            avatars: [],
            currentHeroId: 0
        };

        this.changeEp = this.changeEp.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:9999/roster')
            .then(data => {
                return data.json();
            })
            .then(parsedData => {
                this.setState({avatars: parsedData.slice()});
            });
    }

    changeEp(ep) {
        this.setState({epOnFocus: ep})
    }

    clickHandler(i) {
        this.setState({currentHeroId: i});
    }

    render() {
        return (
            <div className="app">
                <Slider
                    updateFunc={this.changeEp}
                    focusedEp={this.state.epOnFocus}
                />
                <Character
                    onClick={i => this.clickHandler(i)}
                    avatars={this.state.avatars}
                />
                <PresentView
                 value={this.state.avatars[this.state.currentHeroId]}
                />
            </div>
        );
    }
}

export default App;
