import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from "./auth";
import {connect} from 'react-redux';
import Home from "./Home";

function ElementBlender(props) {
    if (props.appState.auth.username === undefined){
        return (
            <Switch>
                <Route exact path='/' component={Auth}/>
            </Switch>
        );
    } else {
        return(
            <Switch>
                <Route exact path='/' component={Home}/>
            </Switch>
        );
    }

}

function mapStateToProps(state) {
    return {
        appState: state
    }
}

export default connect(mapStateToProps)(ElementBlender);