const initState = {
    test: 'Hello World!',
}

export default (state = initState, action) => {
    switch(action.type) {
        default: return state;
    }
}