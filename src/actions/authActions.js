export const signIn = (email, password) => {
    return (dispatch, getState,  { getFirebase } ) => {
        const firebase = getFirebase();

        dispatch({
            type: 'AUTH_RUN',
            status: true
        });

        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            dispatch({
                type: 'AUTH_RUN',
                status: false
            });
            dispatch({ 
                type: 'AUTH_SUCCESS'
            });
        }).catch(err => {
            dispatch({
                type: 'AUTH_RUN',
                status: false
            });
            dispatch({
                type: 'AUTH_FAILED',
                err
            });
        });
    }
}

export const signUp = (email, password) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(email, password).then(newUser => {
            firestore.collection('users').doc(newUser.user.uid).set({
                email: email,
                avatar: 'https://www.kinnarps.pl/contentassets/e61c223f7f8548c1968ad510a63ae4a4/13_portraitplaceholder.jpg?preset=?preset=portrait-quote'
            }).then(() => {
                dispatch({
                    type: 'AUTH_SUCCESS'
                })
            });
        }).catch(err => {
            dispatch({
                type: 'AUTH_FAILED',
                err
            })
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({
                type: 'CLEAR_ACTIVE_NOTES'
            })
            dispatch({
                type: 'CLEAR_NOTES'
            })
            dispatch({
                type: 'UPDATE_ROUTE',
                route: 'all'
            })
        })
    }
}