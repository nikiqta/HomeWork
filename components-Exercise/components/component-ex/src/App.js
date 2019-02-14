import React, { Component } from 'react';
import './App.css';

import Slider from './components/Slider/Slider';
import Characters from './components/Characters/Characters';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedEp: 0,
      rosters: '' 
    };

    this.onChangeEpHandler = this.onChangeEpHandler.bind(this);
  }

async  componentDidMount() {
await fetch(`http://localhost:9999/roster`)
      .then(data => {
        return data.json();
      })
      .then(parsedData => {
        this.setState({ rosters: parsedData });
      });
  }

  onChangeEpHandler(ep) {
    this.setState({ selectedEp: ep });
  }

  render() {
    return (
      <div className="container">
        <h1>React Components</h1>
        <Slider
          selectedEp={this.state.selectedEp}
          onChangeEpHandler={this.onChangeEpHandler}
        />
        <Characters rosters={this.state.rosters} />
      </div>
    );
  }
}

export default App;
