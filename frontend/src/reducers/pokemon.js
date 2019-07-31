import { POKEMON } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_POKEMON = {
    generationId: '',
    pokemonId: '',
    nickname: '',
    birthdate: '',
    traits: []
};

const pokemon = (state = DEFAULT_POKEMON, action) => {
    switch (action.type) {
        case POKEMON.FETCH:
            return { ...state, status: fetchStates.fetching };
        case POKEMON.FETCH_ERROR:
            return { ...state, status: fetchStates.error, message: action.message };
        case POKEMON.FETCH_SUCCESS:
            return { ...state, status: fetchStates.success, ...action.pokemon };
        default:
            return state;
    }
}

export default pokemon;