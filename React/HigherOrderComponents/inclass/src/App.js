import React, {Component} from 'react';
import './App.css';
import dataSource from './services/dataSource';
import CommentsList from './components/CommentsList.jsx'

class App extends Component {
    render() {
        return (
            <div className="App">
                <CommentsList />
            </div>
        );
    }
}

export default App;