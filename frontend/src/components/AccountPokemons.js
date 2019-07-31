import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccountPokemons } from '../actions/accountPokemons';
import AccountPokemonRow from './AccountPokemonRow';
import {Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';

class AccountPokemons extends Component {

    componentDidMount() {
        this.props.fetchAccountPokemons();
    }

    render() {
        return (
            <div>
                <h3>Account Pokemons</h3>
                {
                    this.props.accountPokemons.pokemons.map(pokemon => {
                        return (
                            <div key={pokemon.pokemonId}>
                                <AccountPokemonRow pokemon={pokemon} />
                                <hr />
                            </div>
                        )
                    })
                }
                <Link to='/'>Home</Link>
            </div>
        );

    }
}
const mapStateToProps = (state) => {
    const accountPokemons = state.accountPokemons;
    return {accountPokemons};
}
export default connect(
    mapStateToProps,
    { fetchAccountPokemons }
)(AccountPokemons);
