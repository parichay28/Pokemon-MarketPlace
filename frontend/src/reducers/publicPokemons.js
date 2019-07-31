import { PUBLIC_POKEMONS } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_PUBLIC_POKEMONS = {pokemons: []};

const publicPokemons = (state= DEFAULT_PUBLIC_POKEMONS, action) => {
    switch(action.type){
        case PUBLIC_POKEMONS.FETCH:
            return { ...state, status: fetchStates.fetching };
        case PUBLIC_POKEMONS.FETCH_ERROR:
            return {...state, status: fetchStates.error, message: action.message};
        case PUBLIC_POKEMONS.FETCH_SUCCESS:
            return {...state, status: fetchStates.success, message: action.message, pokemons: action.pokemons};
        default:
            return state;
    }
}

export default publicPokemons;