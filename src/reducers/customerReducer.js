import { Customers }       from '../config/customers';
import uuid                from 'uuid';



const initialState = {
    openCreateNewCustomerScreen: false,
    currentCustomerView: null,
    customersList: Customers
}


const customerReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_CUSTOMERS_FROM_LOCAL_STORAGE': {
            let updatedState = Object.assign({}, state);
            let localStorageData = localStorage.getItem("customersList");
            if (localStorageData) {
                updatedState.customersList = JSON.parse(localStorage.getItem("customersList"));
            } else {
                updatedState.customersList = Customers;
            }
            return updatedState;
        }
        case 'DELETE_CUSTOMER': {
            let updatedState = Object.assign({}, state);
            let index = updatedState.customersList.findIndex(customer => customer.customerId === action.customerId);
            updatedState.customersList.splice(index, 1);
            localStorage.setItem("customersList", JSON.stringify(updatedState.customersList));
            return updatedState;
        }
        case 'CREATE_CUSTOMER': {
            let updatedState = Object.assign({}, state);
            let newCustomer = action.customer;
            newCustomer.customerId = uuid.v1();
            updatedState.customersList.push(newCustomer);
            localStorage.setItem("customersList", JSON.stringify(updatedState.customersList));
            return updatedState;
        }
        case 'TOGGLE_CURRENT_CUSTOMER_VIEW': {
            let updatedState = Object.assign({}, state);
            updatedState.currentCustomerView = action.customer;
            return updatedState;
        }
        case 'TOGGLE_CREATE_NEW_CUSTOMER_VIEW': {
            let updatedState = Object.assign({}, state);
            updatedState.openCreateNewCustomerScreen = !state.openCreateNewCustomerScreen;
            return updatedState;
        }
        default:
            return state
    }
}

export default customerReducer