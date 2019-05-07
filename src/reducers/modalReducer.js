const initState = {
    activeModal: null,
    modalErrorMessage: null
}

const modalReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_MODAL':
            return {
                ...state,
                activeModal: action.data
            }
        case 'SET_MODAL_ERROR_MESSAGE':
            return {
                ...state,
                modalErrorMessage: action.data
            }
        default: return state;
    }
}

export default modalReducer;