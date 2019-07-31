import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { BACKEND } from '../config';

class MatingOptions extends Component {

    mate = ({matronPokemonId, patronPokemonId}) =>() => {
        fetch(`${BACKEND.ADDRESS}/pokemon/mate`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({matronPokemonId, patronPokemonId})
        })
        .then(response => response.json())
        .then(json => {
            alert(json.message);

            if(json.type !== 'error'){
                history.push('/account-pokemons');
            }
        })
    }

    render() {
        return(
            <div>
                <h4>Pick one of your Pokemons to mate with:</h4>
                {
                    this.props.accountPokemons.pokemons.map(pokemon => {
                        const {pokemonId, generationId, nickname} = pokemon;
                        return(
                            <span key={pokemonId}>
                                <Button onClick={
                                    this.mate({
                                        patronPokemonId: this.props.patronPokemonId,
                                        matronPokemonId: pokemon.pokemonId
                                    })
                                }>
                                    GID:{generationId} PID: {pokemonId}.{nickname}
                                </Button>
                                {' '}
                            </span> 
                        )
                    })
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const accountPokemons = state.accountPokemons;
    return { accountPokemons };
}
export default connect(mapStateToProps, null)(MatingOptions);