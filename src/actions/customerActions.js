export const getCustomersFromLocalStorage = () => {
    return {
        type: 'GET_CUSTOMERS_FROM_LOCAL_STORAGE'
    }
}

export const deleteCustomer = (customerId) => {
    return {
        type: 'DELETE_CUSTOMER',
        customerId
    }
}

export const createCustomer = (customer) => {
    return {
        type: 'CREATE_CUSTOMER',
        customer
    }
}

export const toggleCurrentCustomerView = (customer) => {
    return {
        type: 'TOGGLE_CURRENT_CUSTOMER_VIEW',
        customer
    }
}

export const toggleCreateNewCustomerView = () => {
    return {
        type: 'TOGGLE_CREATE_NEW_CUSTOMER_VIEW'
    }
}



