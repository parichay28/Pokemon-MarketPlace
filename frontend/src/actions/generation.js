import { GENERATION } from './types';
import {BACKEND} from '../config';

/*

THIS FUNCTION HAS BEEN INLINED IN BELOW CODE FOR EACH ACTION SEPARATELY

export const generationActionCreator = (payload) => {
    return {
        type: GENERATION_ACTION_TYPE,
        generation: payload
    };
}

*/

export const fetchGeneration = () => dispatch => {
    dispatch({ type: GENERATION.FETCH });
    return fetch(`${BACKEND.ADDRESS}/generation`)
        .then(response => response.json())
        .then(json => {
            if(json.type === 'error'){
                dispatch({
                    type: GENERATION.FETCH_ERROR,
                    message: json.message
                });
            }
            else {
                dispatch(
                    {
                        type: GENERATION.FETCH_SUCCESS,
                        generation: json.generation
                    }
                );
            }
            

        })
        .catch(error => dispatch({type: GENERATION.FETCH_ERROR,
            message: error.message}));
};