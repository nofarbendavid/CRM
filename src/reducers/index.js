import { combineReducers }      from 'redux';
import userReducer              from './userReducer';
import customerReducer          from './customerReducer';


const appCRM = combineReducers({
    userReducer,
    customerReducer
})

export default appCRM