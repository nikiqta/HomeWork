import React, { Component } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Create from './Create/Create';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      isAdmin: false
    };

//    this.onLogoutHandler = this.onLogoutHandler.bind(this);
  }

  render() {
    const { loggedIn, isAdmin } = this.state;
    return (
      <div className="App">
         <header>
             {!loggedIn && <Link class="link" to="/register">Register</Link>}
             {!loggedIn && <Link class="link" to="/login">Login</Link>}
             {loggedIn && isAdmin && <Link class="link" to="/create/movie">Create Movie</Link>}
             {loggedIn && <Link class="link" to="/movie/all">Movies</Link>}
         </header>

        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default App;

/*
                                <Link to="/" className="navbar-brand">FS</Link>
                                <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
                                {loggedIn && <NavLink to="/create" className="nav-link" activeClassName="active">Create Furniture</NavLink>}
                                {loggedIn && <NavLink to="/profile" className="nav-link" activeClassName="active">My Furniture</NavLink>}
                                {loggedIn && <a href="javascript:void(0)" className="nav-link" onClick={logout}>Logout</a>}
                                {!loggedIn && <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>}
                                {!loggedIn && <NavLink to="/register" className="nav-link" activeClassName="active">Register</NavLink>}
 */
