import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import Header from './components/Header.jsx';
import LoginForm from './Form/Form.jsx';

const About = ({match}) => (
    <div>
        <h1>About Page</h1>
        <Route path={match.url + '/contact'} component={Contact}/>
    </div>
);

const Home = props => (
    <div>
        <h1>Home Page</h1>
    </div>
);

const DashBoard = props => (
    <div>
        <h1>Your Dashboard</h1>
    </div>
);

const Contact = props => (
    <div>
        <h1>Contact Nested Page</h1>
    </div>
);

const User = props => (
    <div>
        <h1>User details</h1>
        <p>Displaying details for {props.match.params.userName}</p>
    </div>
);

const NotFound = props => (
    <div>
        <h1>404 Not Found!</h1>
    </div>
);

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedIn: false
        }
    }
    render() {
        return (
            <div className="App">
                <Header/>
                <Switch>
                    <Route exact path="/" render={() => {
                      if (this.state.loggedIn){
                          return (
                           <Redirect to="/dashboard"/>
                          );
                      } else {
                          return (
                              <Home/>
                          );
                      }
                    }}/>
                    <Route path="/dashboard" component={DashBoard}/>
                    <Route path="/about" component={About}/>
                    <Route path="/details/:userName" component={User}/>
                    <Route component={NotFound}/>
                </Switch>
                <LoginForm/>
            </div>
        );
    }
}

export default App;
