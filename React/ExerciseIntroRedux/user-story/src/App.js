import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './user/actionCreators';
import {bindActionCreators} from 'redux';
import './App.css';
import InputSection from "./components/InputForm";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: '',
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteLast = this.deleteLast.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault(e);
        if (this.state.text) {
            this.props.actions['add'](this.state.text);
            this.setState({text: ''});
        } else {
            return null;
        }
    }

    deleteLast(){
        this.props.actions['deleteLast']();
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.onSubmit}>
                    <input
                        onChange={this.onChangeHandler}
                        name="text"
                        type="text"
                        value={this.state.text}
                    />
                    <button>Add input</button>
                </form>
                {this.props.appState && this.props.appState.map((data, i) => {
                    return (
                        <InputSection
                            key={data.index}
                            data={data}
                            text={this.state.text}
                        />
                    );
                })}
                {this.props.appState !== undefined && this.props.appState.length !== 0
                    ? <button id="deleteBtn" onClick={this.deleteLast}>Delete Last</button>
                    : null}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        appState: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
