import React, {Component} from 'react';
import './App.css';
import Header from "./components/common/Header.jsx";
import Catalog from "./components/Catalog";
import Preloader from "./components/preloader/Preloader.jsx";
import { Switch, Route } from 'react-router-dom';
import EditForm from "./components/EditForm";

class App extends Component {
    render() {
        return (
            <div className="container">
                <Preloader/>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Catalog} />
                    <Route path='/edit/:id' component={EditForm} />
                    <Route path='/edit' component={EditForm} />
                </Switch>
            </div>
        );
    }
}

export default App;
