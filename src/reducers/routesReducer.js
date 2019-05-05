const initState = {
    activeRoute: 'all'
}

const routesReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_ROUTE':
            return {
                ...state,
                activeRoute: action.route
            }
        default: return state;
    }
}

export default routesReducer;