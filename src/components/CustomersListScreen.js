import React, { Component }         from 'react';
import PropTypes                    from 'prop-types';
import autoBind                     from 'react-autobind';
import Button                       from './Button';
import Header                       from './Header';
import { Columns }                  from '../config/columns';
import {Redirect, Link}             from 'react-router-dom';
import TableWrapper                 from './TableWrapper';

const basicInfoProperties = ["firstName", "lastName"];


class CustomersListScreen extends Component{

    constructor(){
        super();
        autoBind(this);
    }

    componentWillMount(){
        this.props.customerActions.getCustomersFromLocalStorage();
    }

    _handleLogout(){
        this.props.userActions.logout();
    }

    _getBasicInfo(){
        let basicInfo = [];
        basicInfoProperties.forEach(property => {
            basicInfo.push({
                accessor: property,
                Header: Columns.find(column => column.name === property).caption,
                width: 200
            })
        })
        return basicInfo;
    }

    _getColumns(){
        return [
            {
                Header: '',
                width: 50,
                Cell: row => (
                    <div className="fa fa-trash"
                         style={{cursor: 'pointer'}}
                         onClick={() => this.props.customerActions.deleteCustomer(row.original.customerId)}
                    />
                )
            },
            ...this._getBasicInfo(),
            {
                Header: '',
                width: 120,
                Cell: row => (
                    <Button title="View" handleClick={()=> this.props.customerActions.toggleCurrentCustomerView(row.original)}
                    />
                )
            },
        ]
    }


    render() {
        const columns = this._getColumns();

        if(this.props.data.openCreateNewCustomerScreen){
            return <Redirect to='/create'/>
        }else if (this.props.data.currentCustomerView){
            return <Redirect to={`/customers/${this.props.data.currentCustomerView.customerId}`} />
        }

        return (
            <div className="customers-list-screen-container">
                <Header text="Customers list"/>
                <div className="customer-list-section">
                    <TableWrapper
                        columns={columns}
                        data={this.props.data.customersList}
                        defaultPageSize={this.props.data.customersList.length}
                        filterable={false}
                        pivotBy={undefined}
                    />
                </div>
                <div className="section button-section">
                    <Link to='/'><Button handleClick={this._handleLogout} title="Logout"/></Link>
                </div>

                <div className="add-new-button">
                    <Button handleClick={this.props.customerActions.toggleCreateNewCustomerView}
                            title="Add New Customer"/>
                </div>


            </div>
        )
    }
}

CustomersListScreen.PropTypes= {
    data: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired,
    customerActions: PropTypes.object.isRequired
}


export default CustomersListScreen;