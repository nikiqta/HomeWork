import React, {Component} from 'react';
import './App.css';
import service from './db/service';
import Contact from "./components/Contact";
import Details from "./components/Details";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: service.contacts,
            details: service.contacts[0]
        };
        this.onContactClickHandler = this.onContactClickHandler.bind(this);
    }

    onContactClickHandler(id) {
        const details = this.state.contacts[id];
        this.setState({details: details});
    }


    render() {
        return (
            <div className="container">
                <header>&#9993; Contact Book</header>
                <div id="book">
                    <div id="list">
                        <h1>Contacts</h1>
                        <div className="content">
                            {this.state.contacts.map((contact, index) => {
                                return (
                                    <Contact
                                        key={index}
                                        data={contact}
                                        onClickHandler={this.onContactClickHandler}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div id="details">
                        <h1>Details</h1>
                        <Details data={this.state.details}/>
                    </div>
                </div>
                <footer>Contact Book SPA &copy; 2017</footer>
            </div>
        );
    }
}

export default App;
