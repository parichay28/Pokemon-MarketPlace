import { POKEMON } from './types';
import { BACKEND } from '../config';


export const fetchPokemon = () => (dispatch) => {
    dispatch({ type: POKEMON.FETCH });
    return fetch(`${BACKEND.ADDRESS}/pokemon/new`, {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(json => {
            if (json.type === 'error') {
                dispatch({
                    type: POKEMON.FETCH_ERROR,
                    message: json.message
                });
            }
            else {
                dispatch({
                    type: POKEMON.FETCH_SUCCESS,
                    pokemon: json.pokemon
                });
            }
        })
        .catch(error => dispatch({ type: POKEMON.FETCH_ERROR, message: error.message }))

}