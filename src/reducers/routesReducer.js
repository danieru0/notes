const initState = {
    activeRoute: 'all',
    routeChanging: false
}

const routesReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_ROUTE':
            return {
                ...state,
                activeRoute: action.route,
                routeChanging: true
            }
        default: return state;
    }
}

export default routesReducer;