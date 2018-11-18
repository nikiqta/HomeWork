import React, {Component} from 'react';
import reqHandler from "../../utils/requestHandler";
import calcTime from "../../utils/calcTime";
import Comment from "../partials/Comment";
import CommentForm from "../forms/CommentForm";
import {Link} from "react-router-dom";
import deletePost from "../../utils/deletePost";

export default class Details extends Component{

    constructor(props) {
        super(props);

        this.state = {
            currentPost: '',
            comments:[]
        };
    }

    componentDidMount(){
        let postId = this.props.match.params.id;
        const postData = reqHandler.getPostDetails(postId);
        const commentsData = reqHandler.getPostComments(postId);
        Promise.all([postData, commentsData])
            .then(([postInfo, commentsInfo]) => {
                this.setState({currentPost: postInfo,
                               comments: commentsInfo});
            });
    }

    render(){
        return(
            <section id="viewComments">
                <div className="post">
                    <div className="col thumbnail">
                        <a href={this.state.currentPost.url}>
                            <img alt="post" src={this.state.currentPost.imageUrl}/>
                        </a>
                    </div>
                    <div className="post-content">
                        <div className="title">
                            <a href={this.state.currentPost.url}>
                                {this.state.currentPost.title}
                            </a>
                        </div>
                        <div className="details">
                            <p>{this.state.currentPost.description}</p>
                            <div className="info">
                                submitted {this.state.currentPost !== '' ? calcTime(this.state.currentPost._kmd.lmt) : null} ago by {this.state.currentPost.author}
                            </div>
                            <div className="controls">
                                {this.state.currentPost.author === localStorage.getItem('username')
                                    ?
                                 <ul>
                                    <li className="action">
                                        <Link className="editLink" to={`/edit/${this.state.currentPost._id}`}>edit</Link>
                                    </li>
                                    <li className="action">
                                        <a className="deleteLink" onClick={() => {deletePost(this.state.currentPost._id)}}>delete</a>
                                    </li>
                                 </ul>
                                    : null}
                            </div>

                        </div>
                    </div>
                    <div className="clear"> </div>
                </div>
                <div className="post post-content">
                   <CommentForm postId={this.props.match.params.id}/>
                </div>
                {[...this.state.comments].map((c,i) => {
                    return(<Comment key={c._id} index={++i} data={c}/>);
                })}
            </section>
        );
    }

}