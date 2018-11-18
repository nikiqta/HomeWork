import React, {Component} from 'react';
import dataCollector from "../../utils/dataCollector";
import reqHandler from "../../utils/requestHandler";

export default class CommentForm extends Component{
    constructor(props) {
        super(props);

        this.dataCollector = this.dataCollector.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.setState({author: localStorage.getItem('username'),
                      postId: this.props.postId});
    }

    dataCollector(e){
        this.setState(dataCollector(e));
    }

    onSubmit(e) {
        e.preventDefault();
        reqHandler.createComment(this.state)
            .then(() => {
               window.location.reload()
            });
    }

    render(){
        return(
            <form id="commentForm" onSubmit={this.onSubmit}>
                <label>Comment</label>
                <textarea
                    onChange={(e) => {this.dataCollector(e)}}
                    name="content">
                </textarea>
                <input type="submit" value="Add Comment" id="btnPostComment"/>
            </form>
        );
    }

}