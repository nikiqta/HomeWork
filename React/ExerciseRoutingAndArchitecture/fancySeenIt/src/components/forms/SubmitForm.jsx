import React, {Component} from 'react';
import dataCollector from "../../utils/dataCollector";
import reqHandler from "../../utils/requestHandler";

export default class SubmitForm extends Component{
    constructor(props) {
        super(props);

        this.dataCollector = this.dataCollector.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.setState({author: localStorage.getItem('username')});
    }

    dataCollector(e){
        this.setState(dataCollector(e));
    }

    onSubmit(e){
        e.preventDefault();
        reqHandler.createPost(this.state).then(response => {
            window.history.go(-1);
        });
    }

    render(){
        return(
            <div className="submitArea formContainer">
                <form
                    id="submitForm"
                    className="submitForm"
                    onSubmit={this.onSubmit}>
                    <label>Link URL:</label>
                    <input
                        onChange={(e) => {this.dataCollector(e)}}
                        name="url"
                        type="text"/>
                    <label>Link Title:</label>
                    <input
                        onChange={(e) => {this.dataCollector(e)}}
                        name="title"
                        type="text"/>
                    <label>Link Thumbnail Image (optional):</label>
                    <input
                        onChange={(e) => {this.dataCollector(e)}}
                        name="imageUrl"
                        type="text"/>
                    <label>Comment (optional):</label>
                    <textarea
                        onChange={(e) => {this.dataCollector(e)}}
                        name="description">
                    </textarea>
                    <input id="btnSubmitPost" value="Submit" type="submit"/>
                </form>
            </div>
        );
    }
}