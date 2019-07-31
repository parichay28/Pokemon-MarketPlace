import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { signup } from '../actions/account';
import { login } from '../actions/account';

import { connect } from 'react-redux';
import fetchStates from '../reducers/fetchStates';

class AuthForm extends Component {
    state = {
        username: '',
        password: '',
        buttonClicked: false
    }

    updateUsername = event => {
        this.setState({ username: event.target.value });
    }

    updatePassword = event => {
        this.setState({ password: event.target.value });
    }

    signup = () => {
        this.setState({buttonClicked: true});
        
        const { username, password } = this.state;
        this.props.signup({ username, password });
    }

    login = () => {
        this.setState({buttonClicked: true});

        const {username, password } = this.state;
        this.props.login({username, password});
    }

    get Error() {
        if(this.state.buttonClicked &&
            this.props.account.status === fetchStates.error) {
            return <div>{this.props.account.message}</div>
        }
    }

    render() {
        return (
            <div>
                <h2>Pokemon MarketPlace</h2>
                <FormGroup>
                    <FormControl
                        type='text'
                        value={this.state.username}
                        placeholder='username'
                        onChange={this.updateUsername}
                    />
                    <br />
                    <FormControl
                        type='password'
                        value={this.state.password}
                        placeholder='password'
                        onChange={this.updatePassword}
                    /> 
                </FormGroup>
                <br />
                <div>
                    <Button onClick={this.login}>Login</Button>
                    <span> or </span>
                    <Button onClick={this.signup}>Sign Up</Button>
                </div>
                <br/>
                {this.Error}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const account = state.account;
    return {account};
};

export default connect(mapStateToProps, { signup, login })(AuthForm);