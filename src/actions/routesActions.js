export const updateRoute = route => {
    return dispatch => {
        dispatch({
            type: 'UPDATE_ROUTE',
            route
        })
        dispatch({
            type: 'CLEAR_NOTES'
        })
    }
}