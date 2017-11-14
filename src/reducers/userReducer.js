const initialState = {
    userLoggedIn: null
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'LOGIN': {
            let updatedState = Object.assign({}, state);
            updatedState.userLoggedIn = action.userId;
            return updatedState;
        }
        case 'LOGOUT': {
            let updatedState = Object.assign({}, state);
            updatedState.userLoggedIn = null;
            return updatedState;
        }
        default:
            return state
    }
}

export default userReducer