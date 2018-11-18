import React from 'react';
import calcTime from "../../utils/calcTime";
import deleteComment from "../../utils/deleteComment";


export default function Comment(props) {
    return(
        <article className="post post-content">
            <p>{props.data.content}</p>
            <div className="info">
                submitted {calcTime(props.data._kmd.lmt)} ago by {props.data.author} | {props.data.author === localStorage.getItem('username')
            ?
                <a onClick={() => {
                    deleteComment(props.data._id);
            }} className="deleteLink">delete</a>
                : null}
            </div>
        </article>
    )
}