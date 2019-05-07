export const showModal = type => {
    return dispatch => {
        dispatch({
            type: 'UPDATE_MODAL',
            data: type
        })
    }
}