const initState = {
    notes: null
}

const notesReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_NOTES':
            return {
                ...state,
                notes: action.notes
            }
        case 'CLEAR_NOTES':
            return {
                ...state,
                notes: null
            }
        default: return state;
    }
}

export default notesReducer;