import React, {Component} from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        // Bind event handlers
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        alert(this.state.value);
        this.setState({
            name: '',
            password: '',
            bio: '',
            make: 'Volvo'
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <label>Username:
                    <input
                        id="username"
                        onChange={this.onChange}
                        name="name"
                        type="text"
                        value={this.state.name}/>
                </label>
                <label>
                    Password:
                    <input
                        onChange={this.onChange}
                        type="password"
                        name="password"
                        value={this.state.password}/>
                </label>
                <label>
                    Bio:
                    <textarea
                        onChange={this.onChange}
                        name="bio"
                        value={this.state.bio}/>
                </label>
                <label>
                    <input
                        type="submit"
                        value="Maji Gosho!"/>
                </label>
                <select
                    onChange={this.onChange}
                    name="make"
                    value={this.state.make}>
                    <option value="Volvo">Volvo</option>
                    <option value="Audi">Audi</option>
                </select>
            </form>
        );
    }
}

export default Form;