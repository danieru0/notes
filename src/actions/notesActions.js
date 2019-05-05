export const getAllNotes = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firestore.collection('users').doc(user.uid).collection('notes').get().then(snapshot => {
                    let notes = snapshot.docs.map(doc => doc.data());
                    dispatch({
                        type: 'UPDATE_NOTES',
                        notes
                    });
                })
            }
        });
    }
}

export const getStarNotes = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firestore.collection('users').doc(user.uid).collection('notes').where("star", "==", true).where("trash", "==", false).get().then(snapshot => {
                    let notes = snapshot.docs.map(doc => doc.data());
                    dispatch({
                        type: 'UPDATE_NOTES',
                        notes
                    });
                });
            }
        })
    }
}

export const getTrashNotes = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firestore.collection('users').doc(user.uid).collection('notes').where("trash", "==", true).get().then(snapshot => {
                    let notes = snapshot.docs.map(doc => doc.data());
                    dispatch({
                        type: 'UPDATE_NOTES',
                        notes
                    });
                });
            }
        })
    }   
}

export const getTagNotes = tag => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firestore.collection('users').doc(user.uid).collection('notes').where("tag", "==", tag).get().then(snapshot => {
                    let notes = snapshot.docs.map(doc => doc.data());
                    dispatch({
                        type: 'UPDATE_NOTES',
                        notes
                    });
                });
            }
        })
    }   
}

export const getSpecificNote = id => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firestore.collection('users').doc(user.uid).collection('notes').doc(id).get().then(snapshot => {
                    console.log(snapshot.data());
                });
            }
        })
    }  
}

//----------------------------------------------------

export const createNewNote = (tag, color, name) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let newNote = firestore.collection('users').doc(user.uid).collection('notes').doc();
                newNote.set({
                    tag: tag,
                    color: color,
                    name: name,
                    star: false,
                    value: '',
                    id: newNote.id,
                    trash: false
                })
            }
        });
    }
}

export const updateNote = (id, type, newValue) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let noteRef = firestore.collection('users').doc(user.uid).collection('notes').doc(id);
                firestore.runTransaction(transaction => {
                    return transaction.get(noteRef).then(doc => {
                        let update;
                        switch(type) {
                            case 'text':
                                update = doc.data().value = newValue;
                                transaction.update(noteRef, { value: update });
                                break;
                            case 'star':
                                update = doc.data().star = newValue;
                                transaction.update(noteRef, { star: update });
                                break;
                            case 'trash':
                                update = doc.data().trash = newValue;
                                transaction.update(noteRef, { trash: newValue });
                                break;
                            default: break;
                        }
                    }).then(() => {
                        console.log('SUCCESS! :D');
                    }).catch(err => {
                        console.log(err);
                    })
                })
            }
        });
    }
}