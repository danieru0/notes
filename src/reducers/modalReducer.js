const initState = {
    activeModal: null
}

const modalReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_MODAL':
            return {
                ...state,
                activeModal: action.data
            }
        default: return state;
    }
}

export default modalReducer;