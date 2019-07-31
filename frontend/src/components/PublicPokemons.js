import React, {Component} from 'react';
import { connect} from 'react-redux';
import { fetchPublicPokemons } from '../actions/publicPokemons';
import {fetchAccountPokemons} from '../actions/accountPokemons'
import { Link } from 'react-router-dom';
import PublicPokemonRow from './PublicPokemonRow';

class PublicPokemons extends Component {

    componentDidMount(){
        this.props.fetchPublicPokemons();
        this.props.fetchAccountPokemons();
    }

    render() {
        return(
            <div>
                <h3>Public Pokemons</h3>
                {
                    this.props.publicPokemons.pokemons.map(pokemon => {
                        return(
                            <div key={pokemon.pokemonId}>
                                <PublicPokemonRow pokemon={pokemon} />
                                <hr />
                            </div>
                        )
                    })
                }
                <Link to='/'>Home</Link>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const publicPokemons = state.publicPokemons;
    return {publicPokemons};
}

export default connect(
    mapStateToProps,
    {fetchPublicPokemons, fetchAccountPokemons}
    )(PublicPokemons);