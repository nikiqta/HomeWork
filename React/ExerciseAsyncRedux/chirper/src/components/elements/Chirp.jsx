import React from 'react';
import {connect} from 'react-redux';
import calcTime from "../../utils/calcTime";

function Chirp(props){
        return(
                <article className="chirp">
                    <div className="titlebar">
                        <a href="#" className="chirp-author">{props.data.author}</a>
                        <span className="chirp-time">{calcTime(props.data._kmd.lmt)} ago</span>
                    </div>
                    <p>{props.data.text}</p>
                </article>
        );
}

function mapStateToProps(state) {
    return {
        appState: state
    }
}

export default connect(mapStateToProps)(Chirp);