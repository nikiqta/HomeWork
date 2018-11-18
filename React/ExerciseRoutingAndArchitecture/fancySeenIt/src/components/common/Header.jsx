import React from 'react';
import {Link} from 'react-router-dom';

export default function Header(props) {
       return (
           <header>
               <span className="logo">☃</span><span className="header">SeenIt</span>
               <div style={({"display": props.username ? '' : 'none'})}
                   id="profile">
                   <span>{props.username}</span>|<Link to="/" onClick={() => {
                       localStorage.clear();
                       props.history.push("/");
               }}>logout</Link>
               </div>
           </header>
       );
}