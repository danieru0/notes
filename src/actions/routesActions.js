export const updateRoute = route => {
    return dispatch => {
        dispatch({
            type: 'UPDATE_ROUTE',
            route
        })
    }
}