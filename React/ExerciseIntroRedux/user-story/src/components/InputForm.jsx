import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../user/actionCreators';
import {bindActionCreators} from 'redux';

class InputSection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.data.text,
            isSelected: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.makeEdit = this.makeEdit.bind(this);
        this.discardEdit = this.discardEdit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(){
        this.setState({isSelected: true});
    }

    makeEdit(){
        if (this.state.value) {
            this.props.actions['edit'](this.state.value, this.props.data.index);
            this.setState({isSelected: false});
        } else {
            return null;
        }
    }

    discardEdit(){
        let currentIndex = this.props.data.index;
        this.setState({isSelected: false});
        this.setState({value: this.props.appState[currentIndex].text});
        return null;
    }

    render() {
        return (
            <div>
                <input
                    onChange={(e) => {this.onChange(e)}}
                    name="value"
                    type="text"
                    value={this.state.value}
                />
                {this.state.isSelected === false
                ? <button onClick={this.onSubmit}>Edit input</button>
                : <span className="spanContainer">
                        <span role="img" id="greenThick" onClick={this.makeEdit}>&#9989;</span>
                        <span role="img" id="redX" onClick={(e) => {this.discardEdit(e)}}>&#10060;</span>
                  </span>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(InputSection);