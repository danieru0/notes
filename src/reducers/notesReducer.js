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
        default: return state;
    }
}

export default notesReducer;