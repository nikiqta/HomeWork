import React, {Component} from 'react';
import * as actions from './../counter/actionCreators.js';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

class Counter extends Component {
    constructor(props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
    }

   async onClickHandler(e) {
        this.props.actions[e.target.name]();
    }

    render() {
        return (
            <div className="container">
                <div id="counter-value">{this.props.calculator}</div>
                <button
                    name="increment"
                    onClick={this.onClickHandler}
                >+
                </button>
                <button
                    name="decrement"
                    onClick={this.onClickHandler}
                >-
                </button>
                <button
                    name="clear"
                    onClick={this.onClickHandler}
                >clear
                </button>
                <div>
                    <h3>Comments</h3>
                    <ul>
                        {this.props.comments.map((c,index) => (
                            <li key={index}>{c}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        calculator: state.calculator,
        comments: state.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

// const curried = connect();
// const counter = curried(Counter);

export default connect(mapStateToProps, mapDispatchToProps)(Counter);