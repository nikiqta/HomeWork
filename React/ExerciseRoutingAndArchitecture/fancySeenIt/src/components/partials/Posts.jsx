import React from 'react';
import {Link} from 'react-router-dom';
import calcTime from "../../utils/calcTime";
import deletePost from "../../utils/deletePost";

export default function Post(props) {
    return (
        <article className="post">
                <div className="col rank">
                    <span>{props.index}</span>
                </div>
                <div className="col thumbnail">
                    <a href={props.data.url}>
                        <img alt="catalog"
                             src={props.data.imageUrl}/>
                    </a>
                </div>
                <div className="post-content">
                    <div className="title">
                        <a href={props.data.url}>
                            {props.data.title}
                        </a>
                    </div>
                    <div className="details">
                        <div className="info">
                            submitted {calcTime(props.data._kmd.lmt)} ago by {props.data.author}
                        </div>
                        <div className="controls">
                            {props.data.author === localStorage.getItem('username')
                            ?
                                <ul>
                                    <li className="action">
                                        <Link className="commentsLink" to={`/details/${props.data._id}`}>comments</Link>
                                    </li>
                                    <li className="action">
                                        <Link className="editLink" to={`edit/${props.data._id}`}>edit</Link>
                                    </li>
                                    <li className="action">
                                        <a className="deleteLink" onClick={() => {deletePost(props.data._id, "post")}}>delete</a>
                                    </li>
                                </ul>
                            :
                                <ul>
                                    <li className="action">
                                        <Link className="commentsLink" to={`/details/${props.data._id}`}>comments</Link>
                                    </li>
                                </ul>
                            }
                        </div>

                    </div>
                </div>
            </article>
    );
}