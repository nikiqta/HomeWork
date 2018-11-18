import React from 'react';
import {connect} from "react-redux";
import Chirp from "./Chirp";

function Home(props) {
    return (
        <section id="viewFeed">
            <div className="content">
                <div className="chirper">
                    <h2 className="titlebar">{props.auth.username}</h2>

                    <form id="formSubmitChirp" className="chirp-form">
                        <textarea name="text" className="chirp-input"> </textarea>
                        <input className="chirp-submit" id="btnSubmitChirp" value="Chirp" type="submit"/>
                    </form>
                    <div id="userStats" className="user-details">
                        <span>
                            {props.chirps.filter(c => c.author === props.auth.username).length} chirps
                        </span> | <span>
                        {props.auth.subscriptions.length} following
                        </span> | <span>
                            3 followers
                        </span>
                    </div>
                </div>
                <div id="chirps" className="chirps"><h2 className="titlebar">Chirps</h2>
                    {props.chirps && props.chirps.map((c) => {
                        if (props.auth.subscriptions.includes(c.author)) {
                            return (
                                <Chirp key={c._id} data={c}/>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </section>
    );
}

function mapStateToProps(state) {
    return {
        chirps: state.chirps,
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Home);