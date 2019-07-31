import React, { Component } from 'react';
import { connect } from 'react-redux';
import PokemonAvatar from './PokemonAvatar';
import { Button } from 'react-bootstrap';
import { fetchPokemon } from '../actions/pokemon';
import fetchStates from '../reducers/fetchStates';

// const DEFAULT_POKEMON = {
//     nickname: '',
//     generationId: '',
//     pokemonId: '',
//     birthdate: '',
//     traits: []
// };

class Pokemon extends Component {

    get PokemonView() {
        if (this.props.pokemon.status === fetchStates.error) {
            return <span>{this.props.pokemon.message}</span>
        }
        return (
            <div>
                <PokemonAvatar pokemon={this.props.pokemon} />
            </div>
        )
    }

    // state = { pokemon: DEFAULT_POKEMON };

    // componentDidMount() {
    //     this.props.fetchPokemon();
    // }

    // fetchPokemon = () => {
    //     fetch('http://localhost:3000/pokemon/new')
    //         .then(response => response.json())
    //         .then(json => this.setState({ pokemon: json.pokemon }))
    //         .catch(error => console.error('error', error));
    // }

    render() {

        return (
            /*Here we are passing the properties(props) of parent component i.e. Pokemon 
             to the child component PokemonAvatar using the pokemon={} part. */

            <div>
                <Button onClick={this.props.fetchPokemon}>New Pokemon</Button>
                <br />
                {this.PokemonView}
            </div>


        );
    }
}

const mapStateToProps = (state) => {
    const pokemon = state.pokemon;
    return { pokemon };
};

export default connect(
    mapStateToProps,
    { fetchPokemon }
)(Pokemon);
