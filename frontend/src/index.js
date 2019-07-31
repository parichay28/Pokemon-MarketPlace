import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import rootReducer from './reducers';

import './index.css';

import Root from './components/Root';
import AccountPokemons from './components/AccountPokemons';
import PublicPokemons from './components/PublicPokemons';

import { fetchAuthenticated } from './actions/account';

import history from './history'
//import createBrowserHistory from 'history/createBrowserHistory';


//THUNK is used to handle action objects which contains function instead of normal plain object functions

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const history = createBrowserHistory();

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk)),

);


const AuthRoute = (props) => {
    if(!store.getState().account.loggedIn){
        return(
            <Redirect to={{pathname: '/'}}/>
        )
    }

    const {component, path } = props;

    return(
        <Route path={path} component={component}/>
    )
    
}

store.dispatch(fetchAuthenticated())
    .then(() => {
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact={true} path='/' component={Root} />
                        <AuthRoute path='/account-pokemons' component={AccountPokemons} />
                        <AuthRoute path='/public-pokemons' component={PublicPokemons} />
                    </Switch>
                </Router>
            </Provider>,
            document.getElementById('root')
        );
    });


//store.subscribe(() => console.log('store state update', store.getState()));


/*
THIS FETCH FUNCTION IS IMPLEMENTED IN GENERATION COMPONENT BY BINDING THIS DISPATCH FUNCTION IN THAT COMPONENT

fetch('http://localhost:3000/generation')
    .then(response => response.json())
    .then(json => {
        store.dispatch(generationActionCreator(json.generation))
    })

*/



