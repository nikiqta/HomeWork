import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.data = 5;

class Clock  extends React.Component{
    constructor(props) {
        super(props);
        this.state = {time: (new Date()).toLocaleTimeString()};
    }

    componentDidMount() {
      this.timer = setInterval(this.tick.bind(this), 1000);
    }

    componentDidUnMount() {
        clearInterval(this.timer);
    }

    tick(){
        this.setState({time: (new Date()).toLocaleTimeString()});
    }

    render(){
        return (<p>It is {this.state.time} O'Clock</p>);
    }
}

    const myElement = (
        <div>
            <App />
            <h1>Hello World</h1>
            <Clock />
            <p>Value stored in memory: {window.data}</p>
        </div>
    );

ReactDOM.render(myElement, document.getElementById('root'));
registerServiceWorker();
