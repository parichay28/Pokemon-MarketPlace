import React, { Component } from 'react';
import PokemonAvatar from './PokemonAvatar';
import MatingOptions from './MatingOptions';
import { Button } from 'react-bootstrap';
import { BACKEND } from '../config';
import history from '../history';

class PublicPokemonRow extends Component {

    state = { displayMatingOptions: false }

    toggleDisplayMatingOptions = () => {
        this.setState({
            displayMatingOptions: !this.state.displayMatingOptions
        })
    }

    buy = () => {
        const { pokemonId, saleValue } = this.props.pokemon;

        fetch(`${BACKEND.ADDRESS}/pokemon/buy`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pokemonId, saleValue })
        })
            .then(response => response.json())
            .then(json => {
                alert(json.message);
                if (json.type !== 'error') {
                    history.push('/account-pokemons');
                }
            })
            .catch(error => alert(error.message));
    }
    render() {
        return (
            <div>
                <div>Nickname: {this.props.pokemon.nickname}</div>
                <PokemonAvatar pokemon={this.props.pokemon} />
                <div>
                    <span>Sale Value: {this.props.pokemon.saleValue}</span>
                    {' | '}
                    <span>Sire Value: {this.props.pokemon.sireValue}</span>
                </div>
                <br />
                {<Button onClick={this.buy}>Buy</Button>}
                {' '}
                {<Button onClick={this.toggleDisplayMatingOptions}>Sire</Button>}

                {
                    this.state.displayMatingOptions ? <MatingOptions patronPokemonId={this.props.pokemon.pokemonId}/> : <div></div>
                }
            </div>
        )
    }
}

export default PublicPokemonRow;

