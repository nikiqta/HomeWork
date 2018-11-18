import React, { Component } from 'react';
import validationFunc from "../../utils/formValidator";
import Input from "./formFields/Input";
import PokemonField from './formFields/PokemonField.js';

class PokemonForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            confirmEmail: '',
            userName: '',
            password: '',
            confirmPassword: '',
            name: '',
            image: '',
            info: ''
        };

        this.createPokemon = this.createPokemon.bind(this);
    }

    submitRegister(e) {
        e.preventDefault();
        let payload = {
            name: this.state.name,
            image: this.state.image,
            info: this.state.info
        };
        this.createPokemon(payload);
    }

    createPokemon(payload){
        fetch('http://localhost:5000/pokedex/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
            });
    }

    render(){
        let validObj = validationFunc(
            this.state.email,
            this.state.confirmEmail,
            this.state.userName,
            this.state.password,
            this.state.confirmPassword,
            this.state.name,
            this.state.image,
            this.state.info
        );

        return(
            <form onSubmit={this.submitRegister.bind(this)}>
                <fieldset className='App'>
                    <div style={{ display: 'inline-grid' }}>
                        <h2>Logged</h2>
                        <Input
                            type='text'
                            data='name'
                            name='Pokemon Name'
                            func={e => {
                                this.setState({ name: e.target.value })
                            }}
                            valid={validObj.validPokemonName}
                        />

                        <Input
                            type='text'
                            data='image'
                            name='Pokemon Image'
                            func={e => {
                                this.setState({ image: e.target.value })
                            }}
                            valid={validObj.validImage}
                        />

                        <Input
                            type='text'
                            data='info'
                            name='Pokemon Info'
                            func={e => {
                                this.setState({ info: e.target.value })
                            }}
                            valid={validObj.validInfo}
                        />

                        <input
                            style={({ "display": (validObj.validPokemonName && validObj.validImage && validObj.validInfo) === true ? '' : 'none' })}
                            type='submit'
                            value='Create Pokemon'
                        />
                    </div>
                </fieldset>
            </form>
        );
    }
}

export default PokemonForm;