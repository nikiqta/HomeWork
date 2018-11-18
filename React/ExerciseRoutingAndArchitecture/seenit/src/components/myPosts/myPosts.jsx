import React, {Component} from 'react';
import Post from "../partials/Posts";
import reqHandler from "../../utils/requestHandler";

export default class MyPosts extends Component{
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount(){
        let currentUser = localStorage.getItem('username');
             reqHandler.getUserPosts(currentUser).then(data => {
                 this.setState({posts: data})
             });
    }

    render(){
        return (
            <section id="viewMyPosts">
                <div className="post post-content">
                    <h1>Your Posts</h1>
                </div>
                <div className="posts">
                    {[...this.state.posts].map((post,i) => {
                        return(<Post key={post._id} index={++i} data={post}/>);
                    })}
                </div>
            </section>
        );
    }
}