import React, {Component} from 'react';
import Post from "../partials/Posts";
import reqHandler from "../../utils/requestHandler";

export default class Catalog extends Component{
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount(){
        reqHandler.getPosts().then(data => {
          this.setState({posts: data})
        });
    }

    render(){
             return(
                 <section id="viewCatalog">
                     <div className="posts">
                         {[...this.state.posts].map((post,i) => {
                             return(<Post key={post._id} index={++i} data={post}/>);
                         })}
                     </div>
                 </section>
             );
         }
}