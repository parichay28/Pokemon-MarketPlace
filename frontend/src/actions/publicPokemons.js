import { PUBLIC_POKEMONS } from './types';
import { BACKEND } from '../config';

export const fetchPublicPokemons = () => dispatch => {
    dispatch({ type: PUBLIC_POKEMONS.FETCH });

    return fetch(`${BACKEND.ADDRESS}/pokemon/public-pokemons`)
        .then(response => response.json())
        .then(json => {
            if (json.type === 'error') {
                dispatch({ type: PUBLIC_POKEMONS.FETCH_ERROR, message: json.message });
            }
            else {
                dispatch({ type: PUBLIC_POKEMONS.FETCH_SUCCESS, message: json.message, pokemons: json.pokemons})
            }
        })
        .catch(error => dispatch({type: PUBLIC_POKEMONS.FETCH_ERROR, message: error.message}));
}