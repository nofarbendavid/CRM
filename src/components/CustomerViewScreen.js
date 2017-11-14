import React, { Component }         from 'react';
import PropTypes                    from 'prop-types';
import autoBind                     from 'react-autobind';
import Button                       from './Button';
import Header                       from './Header';
import { userImages }               from '../config/customers';
import { Columns }                  from '../config/columns';
import { Transactions }             from '../config/transactions';
import _                            from 'lodash';
import {Link}                       from 'react-router-dom';
import missing                      from '../static/images/missing.png';
import TableWrapper                 from './TableWrapper';


const additionalInfoProperties = ["gender", "dateOfBirth", "address"];


class CustomerViewScreen extends Component{

    constructor(){
        super();
        autoBind(this);
    }

    _getCustomerName(){
        return this.props.data.currentCustomerView.firstName +
                ' ' + this.props.data.currentCustomerView.lastName ;
    }


    _getAdditionalInfo() {
        let additionalInfo = [];

        additionalInfoProperties.forEach(property => {
            additionalInfo.push(
                <div className="property" key={property}>
                    <span className="property-key">{Columns.find(column => column.name === property).caption}: </span>
                    <span className="property-value">{this.props.data.currentCustomerView[property]}</span>
                </div>)
        })
        return additionalInfo;
    }


    _getCustomerTransactions(){
        return Transactions.filter(trans => trans.customerId === this.props.data.currentCustomerView.customerId);
    }

    _getUniqueTransactions(customerTransactionsList) {
        let transactionsIds = customerTransactionsList.map(trans => trans.transactionId);
        return _.uniq(transactionsIds).length
    }

    _getImage(){
        let image = null;
        if( userImages[this.props.data.currentCustomerView.firstName]){
            image = userImages[this.props.data.currentCustomerView.firstName];
        }else if (this.props.data.currentCustomerView.profileImage){
            image = this.props.data.currentCustomerView.profileImage;
        }else{
            image = missing;
        }

        return image;
    }

    _getColumns(){
        return [
            {
                Header: 'Transaction Id',
                accessor: 'transactionId',
                width: 150,
                Cell : row => {  // will not display pivot on transaction with single item
                    if(row.subRows && row.subRows.length === 1){
                        row.pivoted = false
                    }
                }
            },
            {
                Header: 'Transaction Date',
                accessor: 'transactionDate',
                width: 200,
                aggregate: vals => _.uniq(vals), //remove duplicate dates
            },
            {
                Header: 'itemId',
                accessor: 'itemId'
            },
            {
                Header: 'Item Description',
                accessor: 'itemDescription',
                width: 200,
            },
            {
                Header: 'Price',
                accessor: 'itemPrice',
                aggregate: (vals) => _.sum(vals), // display the total price per transaction
                Cell: row => {
                    if(row.aggregated){
                        return <span>{(row.value).toFixed(2)} NIS</span>
                    }else {
                        return <span>{(row.value * row.row.quantity).toFixed(2)} NIS</span>
                    }
                }
            },
            {
                Header: 'Quantity',
                accessor: 'quantity',
                aggregate: vals => _.sum(vals), //display the total quantity per transaction
            }
        ]
    }

    render() {

        let customerName = this._getCustomerName();
        let customerTransactionsList = this._getCustomerTransactions();
        let numberOfTransactions =this._getUniqueTransactions(customerTransactionsList);
        let image = this._getImage();
        let columns = this._getColumns();

        return (
            <div className="customer-view-container">
                <div className="customer-view-header-section">
                    <div className="customer-image">
                        <img src={image} alt=""/>
                    </div>
                    <div className="customer-details">
                        <Header text={customerName}/>
                        <div className="customer-additional-info">
                            {this._getAdditionalInfo()}
                        </div>
                    </div>
                </div>
                <div className="customer-transactions-section">
                    <TableWrapper
                        columns={columns}
                        data={customerTransactionsList}
                        defaultPageSize={numberOfTransactions}
                        filterable={true}
                        pivotBy={["transactionId"]}
                    />

                </div>
                <div className="section button-section">
                    <Link to='/customers'>
                        <Button handleClick={()=>this.props.customerActions.toggleCurrentCustomerView(null)} title="Back"/>
                    </Link>
                </div>
            </div>
        )
    }
}

CustomerViewScreen.PropTypes= {
    data: PropTypes.object.isRequired,
    customerActions: PropTypes.object.isRequired
}


export default CustomerViewScreen;