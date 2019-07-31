import React, { Component } from 'react';
import Home from './Home';
import AuthForm from './AuthForm';
import { connect } from 'react-redux';


class Root extends Component {

    render(){
        return (
            this.props.account.loggedIn ? <Home /> : <AuthForm />
        );
    }

};
const mapStateToProps = (state) => {
    const account = state.account;
    return {account};
}
export default connect(mapStateToProps, null)(Root);