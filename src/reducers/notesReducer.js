const initState = {
    notes: null,
    activeNote: null,
    noteGetting: false
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
        case 'ACTIVE_NOTE_START':
            return {
                ...state,
                activeNote: null,
                noteGetting: true
            }
        case 'SET_ACTIVE_NOTE':
            return {
                ...state,
                activeNote: action.data,
                noteGetting: false
            }
        default: return state;
    }
}

export default notesReducer;