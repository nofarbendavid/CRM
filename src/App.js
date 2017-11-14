import React, {Component}                       from 'react';
import {connect}                                from 'react-redux';
import * as UserActions                         from './actions/userActions';
import * as CustomerActions                     from './actions/customerActions';
import {bindActionCreators}                     from 'redux';
import LoginScreen                              from './components/LoginScreen';
import CustomerListScreen                       from './components/CustomersListScreen';
import CustomerViewScreen                       from './components/CustomerViewScreen';
import CreateNewCustomerScreen                  from './components/CreateNewCutomerScreen';
import autoBind                                 from 'react-autobind';
import {BrowserRouter as Router, Route}         from 'react-router-dom'


import './styles/App.css';


class App extends Component {

    constructor(){
        super();
        autoBind(this);
        this.loginScreen = () => (
            <LoginScreen
                data={this.props.userData}
                userActions={this.props.userActions}
            />);

        this.customerListScreen = () => (
            <CustomerListScreen
                data={this.props.customerData}
                userActions={this.props.userActions}
                customerActions={this.props.customerActions}
            />);

        this.customerViewScreen = () => (
            <CustomerViewScreen
                data={this.props.customerData}
                customerActions={this.props.customerActions}
            />);

        this.createNewCustomerScreen = () => (
            <CreateNewCustomerScreen
                data={this.props.customerData}
                customerActions={this.props.customerActions}
            />);
    }


    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" component={this.loginScreen}/>
                    <Route exact path="/customers" component={this.customerListScreen}/>
                    <Route exact path="/customers/:customerId" component={this.customerViewScreen}/>
                    <Route exact path="/create" component={this.createNewCustomerScreen}/>
                </div>
            </Router>
        );
    }
}



const mapStateToProps = (state) => {
    const userData = state.userReducer;
    const customerData = state.customerReducer;
    return {
        userData,
        customerData
    }
}


const mapDispatchToProps = (dispatch) => ({
    userActions: bindActionCreators(UserActions, dispatch),
    customerActions: bindActionCreators(CustomerActions, dispatch)
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
