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

export const signUp = (email, password, nick) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        dispatch({
            type: 'AUTH_RUN',
            status: true
        });

        if (nick.length > 11) {
            dispatch({
                type: 'AUTH_RUN',
                status: false
            });
            dispatch({
                type: 'AUTH_FAILED',
                err: {message: 'Maximum nick length is 11 characters!'}
            })
            return false;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password).then(newUser => {
            firestore.collection('users').doc(newUser.user.uid).set({
                email: email,
                avatar: 'https://www.kinnarps.pl/contentassets/e61c223f7f8548c1968ad510a63ae4a4/13_portraitplaceholder.jpg?preset=?preset=portrait-quote',
                tags: {},
                nick: nick
            }).then(() => {
                dispatch({
                    type: 'AUTH_RUN',
                    status: false
                });
                dispatch({
                    type: 'AUTH_SUCCESS'
                })
            });
        }).catch(err => {
            dispatch({
                type: 'AUTH_RUN',
                status: false
            });
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

//----------------------------

export const changeAvatar = file => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        dispatch({
            type: 'SET_PROCESS',
            data: true
        })

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase.storage().ref().child('avatars/'+user.uid).put(file).then(snapshot => {
                    snapshot.ref.getDownloadURL().then(url => {
                        firestore.collection('users').doc(user.uid).update({
                            avatar: url
                        }).then(() => {
                            dispatch({
                                type: 'SET_PROCESS',
                                data: false
                            })
                        })
                    })
                }).catch(err => {
                    console.log(err);
                })
            }
        })
    }
}