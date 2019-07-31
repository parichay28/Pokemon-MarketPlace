import {ACCOUNT_POKEMONS } from './types';
import {fetchFromAccount} from './account';

export const fetchAccountPokemons = () => fetchFromAccount({
    endpoint: 'pokemons',
    options: {credentials: 'include'},
    SUCCESS_TYPE: ACCOUNT_POKEMONS.FETCH_SUCCESS,
    FETCH_TYPE: ACCOUNT_POKEMONS.FETCH,
    ERROR_TYPE: ACCOUNT_POKEMONS.FETCH_ERROR
});