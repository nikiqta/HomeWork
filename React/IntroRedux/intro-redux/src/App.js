import React, {Component} from 'react';
import './App.css';
import store from './calculatorApp.js';
import * as actions from './calculator/actionCreators.js';
// import Display from "./components/Display.jsx";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            storeData: 0,
            value: 0
        };

        this.onChange = this.onChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onChange(e) {
        if (isNaN(Number(e.target.value))) {
            return null;
        } else {
            this.setState({value: Number(e.target.value)});
        }
    }

    onButtonClick(e) {
        this.props.actions[e.target.name](this.state.value);
    }

    render() {
        return (
            <div className="App">
                <input
                    onChange={this.onChange}
                    type="text"
                    value={this.state.value}
                />
                <button
                    onClick={this.onButtonClick}
                    name="add"
                >+
                </button>
                <button
                    onClick={this.onButtonClick}
                    name="subtract"
                >-
                </button>
                <button
                    onClick={this.onButtonClick}
                    name="multiply"
                >*
                </button>
                <button
                    onClick={this.onButtonClick}
                    name="divide"
                >/
                </button>
                <div>
                    <p>Current value in store {this.props.calculator}</p>
                </div>
                <h3>Comments:</h3>
                <ul>
                    {this.props.comments.map((c,i) => (
                        <li key={i}>{c}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        calculator: state.calculator,
        comments: state.comments
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

//const curried = connect();
//const app = curried(App);

export default connect(mapStateToProps, mapDispatchToProps)(App);
