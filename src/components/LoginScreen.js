import React, { Component }         from 'react';
import PropTypes                    from 'prop-types';
import ReactDOM                     from 'react-dom';
import autoBind                     from 'react-autobind';
import Button                       from './Button';
import Header                       from './Header';
import {Users}                      from '../config/users';
import {Redirect}                   from 'react-router-dom';

class LoginScreen extends Component{

    constructor(){
        super();
        autoBind(this);
        this.state = {
            error: null
        }
    }


    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this._handleLogin();
        }
    }

    _handleClear() {
        ReactDOM.findDOMNode(this.refs.username).value = '';
        ReactDOM.findDOMNode(this.refs.password).value = '';
        this.refs.username.style.border = '';
        this.refs.password.style.border = '';

        this.setState({
            error: null
        });
    }


    _handleLogin() {
        let username = ReactDOM.findDOMNode(this.refs.username).value;
        let password = ReactDOM.findDOMNode(this.refs.password).value;
        let missingCredentials = false;

        if (username === '') {
            this.refs.username.style.border = '1px solid red';
            missingCredentials = true;
        } else {
            this.refs.username.style.border = '';
        }

        if (password === '') {
            this.refs.password.style.border = '1px solid red';
            missingCredentials = true;
        } else {
            this.refs.password.style.border = '';
        }

        if (missingCredentials) {
            this.setState({
                error: "Username and password are required"
            });
        } else {
            let validUser = Users.find(user => user.username === username && user.password === password);
            if (validUser) {
                this.setState({
                    error: null
                });
                this.props.userActions.login(validUser.id);
            }
            else {
                this.setState({
                    error: "Username or password are incorrect"
                });
            }
        }
    }


    render() {

        if(this.props.data.userLoggedIn){
            return <Redirect to='/customers'/>
        }

        return (
            <div className="login-screen-container">

                <Header text="PLEASE LOGIN"/>
                <div className="login-form">
                    <div className="section">
                        <div className="title">Username:</div>
                        <input autoFocus type="text" ref="username" maxLength="20"
                               onKeyPress={this._handleKeyPress}/>
                    </div>

                    <div className="section">
                        <div className="title">Password:</div>
                        <input type="password" ref="password" maxLength="20"
                               onKeyPress={this._handleKeyPress}/>
                    </div>

                    <div className="error">{this.state.error}</div>
                    <div className="section button-section">
                        <Button handleClick={this._handleLogin} title="Login"/>
                        <Button handleClick={this._handleClear} title="Clear"/>
                    </div>
                </div>

            </div>
        )
    }
}

LoginScreen.PropTypes= {
    actions: PropTypes.object.isRequired
}

export default LoginScreen;