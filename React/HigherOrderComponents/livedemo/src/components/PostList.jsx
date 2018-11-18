import React from 'react';

export default function PostList(props) {
    return (
        <div>
            <h2>Posts</h2>
            <div>
                {props.posts && props.posts.map((p, i) => {
                    return (
                        <article key={i}>
                             <span>{p.author}</span>
                             <p>{p.text}</p>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}