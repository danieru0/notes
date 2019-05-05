export const signIn = (email, password) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            dispatch({ 
                type: 'LOGIN_SUCCESS'
            })
        }).catch(err => {
            dispatch({
                type: 'LOGIN_FAILED',
                err
            })
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
                    type: 'SIGNUP_SUCCESS'
                })
            });
        }).catch(err => {
            dispatch({
                type: 'SIGNUP_FAILURE',
                err
            })
        });
    }
}