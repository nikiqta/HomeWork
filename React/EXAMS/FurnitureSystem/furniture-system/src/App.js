// Libraries and extensions
import React, {Component} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// Simple Class-Components
import CreatePage from "./components/Create/CreatePage.jsx";
import ProfilePage from "./components/Profile/ProfilePage.jsx";
import DetailsPage from "./components/Details/DetailsPage.jsx";
import NotFound from "./components/common/NotFound.jsx";
import Header from "./components/common/Header.jsx";

// Functional-Components
import Footer from "./components/common/Footer.jsx";

//Class-Components connected with Redux
import HomePage from "./components/Home/HomePage.jsx";
import LoginPage from "./components/Auth/LoginPage.jsx";
import RegisterPage from "./components/Auth/RegisterPage.jsx";

// Thunk Async Functions
import {logoutThunk} from './actions/authActions.js';
import {fetchStatsThunk} from "./actions/statsActions";


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false
        };

        this.onLogoutHandler = this.onLogoutHandler.bind(this);
    }

    onLogoutHandler() {
        this.setState({loggedIn: false});
        this.props.logout();
        this.props.history.push("/");
    }

    componentWillReceiveProps(nextProps, nextContext) {
            if (nextProps.loginSuccess){
                this.setState(({loggedIn: true}));
            }
    }

    componentWillMount() {
         if (localStorage.authToken){
             this.setState({loggedIn: true});
         }
         this.props.fetchStats();
    }


    render() {
        return (
            <div className="App">
                <Header
                    items={this.props.items}
                    users={this.props.users}
                    loggedIn={this.state.loggedIn}
                    logout={this.onLogoutHandler}
                />
                <main>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/view/:page" component={HomePage}/>
                        <Route path="/create" component={CreatePage}/>
                        <Route path="/profile" component={ProfilePage}/>
                        <Route path="/details/:id" component={DetailsPage}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route component={NotFound}/>
                    </Switch>
                </main>
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loginSuccess: state.login.success,
        users: state.stats.users,
        items: state.stats.furniture
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logoutThunk()),
        fetchStats: () => dispatch(fetchStatsThunk())

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
