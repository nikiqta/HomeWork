import React, {Component} from 'react';

class ToggleButton extends Component{
    constructor(props){
        super(props);

        this.state = {
          power: true
        };

        // Bind event handlers
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(){
        this.setState(prevState => ({power: !prevState.power}))
    }

    render(){
        return(
            <button onClick={this.clickHandler}>
                {this.state.power ? 'ON' : 'OFF'}
            </button>
        );
    }
}

export default ToggleButton