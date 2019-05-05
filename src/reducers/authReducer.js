const initState = {
    authRun: false,
    authError: null,
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'AUTH_RUN':
            return {
                ...state,
                authRun: action.status
            }
        case 'AUTH_SUCCESS':
            return {
                ...state,
                authError: null
            }
        case 'AUTH_FAILED':
            return {
                ...state,
                authError: action.err.message
            }
        default: return state;
    }
}

export default authReducer;