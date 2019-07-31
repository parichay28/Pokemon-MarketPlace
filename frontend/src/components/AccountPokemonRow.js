import React, { Component } from 'react';
import PokemonAvatar from './PokemonAvatar';
import { Button } from 'react-bootstrap';
import { BACKEND } from '../config'

class AccountPokemonRow extends Component {

    state = {
        nickname: this.props.pokemon.nickname,
        edit: false,
        isPublic: this.props.pokemon.isPublic,
        saleValue: this.props.pokemon.saleValue,
        sireValue: this.props.pokemon.sireValue
    }

    updateNickname = event => {
        this.setState({ nickname: event.target.value });
    }

    
    updateSaleValue = event => {
        this.setState({saleValue: event.target.value});
    }

    updateSireValue = event => {
        this.setState({sireValue: event.target.value});

    }
    updateIsPublic = event => {
        this.setState({isPublic: event.target.checked})
    }

    get saveAndCancelButton() {
        return (
            <div>
                <Button onClick={this.toggleEdit}>Cancel</Button>
                <span> </span>
                <Button onClick={this.save}>Save</Button>
            </div>


        )
    }

    get editButton() {
        return <Button onClick={this.toggleEdit}>Edit</Button>
    }


    toggleEdit = () => {
        this.setState({ edit: !this.state.edit });
    }

    save = () => {
        fetch(`${BACKEND.ADDRESS}/pokemon/update`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pokemonId: this.props.pokemon.pokemonId,
                    nickname: this.state.nickname,
                    isPublic: this.state.isPublic,
                    saleValue: this.state.saleValue,
                    sireValue: this.state.sireValue
                })
            })
            .then(response => response.json())
            .then(json => {
                if (json.type === 'error') {
                    alert(json.message);
                }
                else {
                    this.toggleEdit();
                }
            })
            .catch(error => alert(error.message));
    }

    render() {
        return (
            <div>
                <input type='text'
                    value={this.state.nickname}
                    onChange={this.updateNickname}
                    disabled={!this.state.edit}
                />
                <br />
                
                <PokemonAvatar pokemon={this.props.pokemon} />
                <div>
                    <span>
                        Sale Value:{' '}
                        <input 
                        type='number'
                        disabled={!this.state.edit}
                        value={this.state.saleValue}
                        onChange={this.updateSaleValue}
                        className='account-pokemon-row-input'
                        />
                    </span>
                    {' '}
                    <span>
                        Sire Value:{' '}
                        <input 
                        type='number'
                        disabled={!this.state.edit}
                        value={this.state.sireValue}
                        onChange={this.updateSireValue}
                        className='account-pokemon-row-input'
                        />
                    </span>
                    {' '}
                    <span>
                        Public:{' '}
                        <input 
                        type='checkbox'
                        disabled={!this.state.edit}
                        value={this.state.isPublic}
                        onChange={this.updateIsPublic}

                        />
                    </span>
                    {' '}
                    {
                        this.state.edit ? this.saveAndCancelButton : this.editButton
                    }
                </div>


            </div>
        );
    }
}

export default AccountPokemonRow;
