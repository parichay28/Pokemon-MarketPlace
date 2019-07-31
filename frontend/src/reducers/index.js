import { combineReducers } from 'redux';

import generation from './generation';
import pokemon from './pokemon';
import account from './account';
import accountPokemons from './accountPokemons';
import accountInfo from './accountInfo';
import publicPokemons from './publicPokemons';


export default combineReducers({
    account,
    generation,
    pokemon,
    accountPokemons,
    accountInfo,
    publicPokemons
});