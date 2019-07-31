import React, { Component } from 'react';
import Generation from './Generation';
import Pokemon from './Pokemon';
import {Button } from 'react-bootstrap';
import {connect } from 'react-redux';
import { logout } from '../actions/account';
import {Link} from 'react-router-dom';
import AccountInfo from './AccountInfo';
//import AccountPokemons from './AccountPokemons';

class Home extends Component {
    render() {

        return (
            <div>
                <Button onClick={this.props.logout} className='logout-button'>Log Out</Button>
                <h2>Pokemon MarketPlace</h2>
                <Generation />
                <Pokemon />
                <hr/>
                <AccountInfo />
                <Link to='/account-pokemons'>Account Pokemons</Link>
                <br />
                <Link to='/public-pokemons'>Public Pokemons</Link>
                {/*<br/>
                <AccountPokemons/>*/}
            </div>
        );

    }
}

// fetch('http://localhost:3000/account/pokemons',{
//     credentials:'include'
// }).then(response => response.json())
// .then(json => console.log('account pokemons', json));

export default connect(null, { logout })(Home);