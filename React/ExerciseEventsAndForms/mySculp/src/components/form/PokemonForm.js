import React, {Component} from 'react';
import Input from "./formFields/Input";
import pokemonFormValidator from "../../utils/pokemonFormValidator";
import PokemonField from './formFields/PokemonField';

export default class PokemonForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemonName: '',
            pokemonImage: '',
            pokemonInfo: '',
            data: { pokemonCollection: []}
        }
        ;

        this.submitPokemon = this.submitPokemon.bind(this);
        this.createPokemon = this.createPokemon.bind(this);
    }

    submitPokemon(e) {
        e.preventDefault();

        let payload = {
            pokemonName: this.state.pokemonName,
            pokemonImg: this.state.pokemonImage,
            pokemonInfo: this.state.pokemonInfo
        };

        this.createPokemon(payload);
    }

    componentDidMount() {
        fetch('http://localhost:5000/pokedex/pokedex')
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.setState({data: data.pokemonColection});
            });
    }

    createPokemon(payload) {
        fetch('http://localhost:5000/pokedex/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(data => {
                return data.json();
            })
            .then(data => {
            });
    }

    render() {

        let validPokemon = pokemonFormValidator(
            this.state.pokemonName,
            this.state.pokemonImage,
            this.state.pokemonInfo
        );

        return (
            <div>
                <div>
                    <form onSubmit={this.submitPokemon}>
                        <fieldset className='App'>
                            <Input
                                type='text'
                                data='Pokemon Name'
                                name='pokemonName'
                                func={e => {
                                    this.setState({pokemonName: e.target.value})
                                }}
                                valid={validPokemon.validName}
                            />
                            <Input
                                type='text'
                                data='Pokemon Image'
                                name='pokemonImage'
                                func={e => {
                                    this.setState({pokemonImage: e.target.value})
                                }}
                                valid={validPokemon.validImageUrl}
                            />
                            <Input
                                type='text'
                                data='Pokemon Info'
                                name='pokemonInfo'
                                func={e => {
                                    this.setState({pokemonInfo: e.target.value})
                                }}
                                valid={validPokemon.validInfo}
                            />
                            <input
                                style={({"display": (validPokemon.validName && validPokemon.validImageUrl && validPokemon.validInfo) === true ? '' : 'none'})}
                                type='submit'
                                value='Create Pokemon'
                            />
                        </fieldset>
                    </form>
                </div>
                <div style={({display: 'inline-block'})}>
                    {[...this.state.data].map((p,i) => {
                        return <PokemonField key={i} data={p}/>
                    })}
                </div>
            </div>
        );
    }
}