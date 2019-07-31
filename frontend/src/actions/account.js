import { ACCOUNT } from './types';
import { BACKEND } from '../config';

export const fetchFromAccount = ({
    endpoint,
    options,
    FETCH_TYPE,
    ERROR_TYPE,
    SUCCESS_TYPE
}) => dispatch => {
    dispatch({ type: FETCH_TYPE });

    return fetch(`${BACKEND.ADDRESS}/account/${endpoint}`, options)
        .then(response => response.json())
        .then(json => {
            if (json.type === 'error') {
                dispatch({ type: ERROR_TYPE, message: json.message })
            }
            else {
                console.log('INFO', json);
                dispatch({ type: SUCCESS_TYPE, ...json })
            }

        })
        .catch(error => {
            dispatch({ type: ERROR_TYPE, message: error.message })
        });
}

export const login = ({ username, password }) => fetchFromAccount({
    endpoint: 'login',
    options: {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    },
    ERROR_TYPE: ACCOUNT.FETCH_ERROR,
    FETCH_TYPE: ACCOUNT.FETCH,
    SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS
});

export const signup = ({ username, password }) => fetchFromAccount({
    endpoint: 'signup',
    options: {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    },
    ERROR_TYPE: ACCOUNT.FETCH_ERROR,
    FETCH_TYPE: ACCOUNT.FETCH,
    SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS
});

export const logout = () => fetchFromAccount({
    endpoint: 'logout',
    options: { credentials: 'include' },
    SUCCESS_TYPE: ACCOUNT.FETCH_LOGOUT_SUCCESS,
    ERROR_TYPE: ACCOUNT.FETCH_ERROR,
    FETCH_TYPE: ACCOUNT.FETCH
});

export const fetchAuthenticated = () => fetchFromAccount({
    endpoint: 'authenticated',
    options: {
        credentials: 'include'
    },
    SUCCESS_TYPE: ACCOUNT.FETCH_AUTHENTICATED_SUCCESS,
    ERROR_TYPE: ACCOUNT.FETCH_ERROR,
    FETCH_TYPE: ACCOUNT.FETCH

});


/*
THIS METHOD IS GENERALZED ABOVE

export const signup = ({username, password}) => dispatch => {
    dispatch({type: ACCOUNT.FETCH});
    return fetch(`${BACKEND.ADDRESS}/account/signup`,
    {
        method: 'POST',
        body: JSON.stringify({username, password }),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    })
    .then(response => response.json())
    .then(json => {
        if(json.type === 'error'){
            dispatch({type: ACCOUNT.FETCH_ERROR, message: json.message})
        }
        else {
            dispatch({type: ACCOUNT.FETCH_SUCCESS, ...json })
        }

    })
    .catch(error => {
        dispatch({type: ACCOUNT.FETCH_ERROR, message: error.message})

};

*/





/*

export const logout = () => dispatch => {
    dispatch({type: ACCOUNT.FETCH});

    return fetch(`${BACKEND.ADDRESS}/account/logout`,{
        credentials: 'include'
    })
    .then(response => response.json())
    .then(json => {
        if(json.type === 'error'){
            dispatch({type: ACCOUNT.FETCH_ERROR, message: json.message});
        }
        else {
            dispatch({type: ACCOUNT.FETCH_LOGOUT_SUCCESS, ...json});
        }
    })
    .catch(error => dispatch({type: ACCOUNT.FETCH_ERROR, messsage: message.error}))
};

*/

