import React, {Component} from 'react';
import store from '../calculatorApp.js';

export default class Display extends Component{

    constructor(props) {
        super(props);

        this.state = {
             storeData: 0
        };

        this.onStoreUpdate = this.onStoreUpdate.bind(this);

        store.subscribe(this.onStoreUpdate);
    }

    onStoreUpdate(){
        this.setState({storeData: store.getState()});
    }

    componentDidMount() {
        this.setState({storeData: store.getState()});
    }

    render() {
        return (
            <div>
              <span>Store: {this.state.storeData}</span>
            </div>
        );
    }
}