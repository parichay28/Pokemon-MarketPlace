import { ACCOUNT_POKEMONS } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_ACCOUNT_POKEMONS = { pokemons: [] };

const accountPokemons = (state = DEFAULT_ACCOUNT_POKEMONS, action) => {
    switch (action.type) {
        case ACCOUNT_POKEMONS.FETCH:
            return { ...state, status: fetchStates.fetching };

        case ACCOUNT_POKEMONS.FETCH_ERROR:
            return { ...state, status: fetchStates.error, message: action.message };

        case ACCOUNT_POKEMONS.FETCH_SUCCESS:
            return {
                ...state,
                status: fetchStates.success,
                message: action.message,
                pokemons: action.pokemons
            };
        default:
            return state;
    }
}

export default accountPokemons;