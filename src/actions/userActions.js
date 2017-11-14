export const login = (userId) => {
    return {
        type: 'LOGIN',
        userId
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}