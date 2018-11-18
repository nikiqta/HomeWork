import React, {Component} from 'react'
import './App.css'

import WelcomePage from './components/WelcomePage';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            token: ''
        };

        this.authentication = this.authentication.bind(this);
    }

    authentication(data) {
        if (data.success) {
            this.setState({
                token: data.token,
                username: data.user.name
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.user.name);
        }
    }

    componentDidMount(){
        this.setState({token:localStorage.getItem('authtoken')})
    }

    render() {
        return (
            <div>
                <WelcomePage authFunc={this.authentication}/>
            </div>
        );
    }
}

export default App
