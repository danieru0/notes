export const getAllNotes = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firestore.collection('users').doc(user.uid).collection('notes').where("trash", "==", false).get().then(snapshot => {
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
                firestore.collection('users').doc(user.uid).collection('notes').where("tag", "==", tag).where("trash", "==", false).get().then(snapshot => {
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

        dispatch({
            type: 'ACTIVE_NOTE_START'
        });

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firestore.collection('users').doc(user.uid).collection('notes').doc(id).get().then(snapshot => {
                    dispatch({
                        type: 'SET_ACTIVE_NOTE',
                        data: snapshot.data()
                    })
                });
            }
        })
    }  
}

export const removeNote = (id, activeRoute) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firestore.collection('users').doc(user.uid).collection('notes').doc(id).delete().then(() => {
                    dispatch(clearActiveNote());
                    switch(activeRoute) {
                        case 'all':
                            dispatch(getAllNotes());
                            break;
                        case 'star':
                            dispatch(getStarNotes());
                            break;
                        case 'trash':
                            dispatch(getTrashNotes());
                            break;
                        default: dispatch(getTagNotes(activeRoute));
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        })
    }
}

export const clearActiveNote = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_ACTIVE_NOTES'
        });
    }
}

//----------------------------------------------------

export const createNewNote = (tag, color, name, activeRoute) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        dispatch({
            type: 'SET_PROCESS',
            data: true
        })

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let today = new Date();
                let month = today.toLocaleDateString('en-US', { month: 'long' }).slice(0,3);
                let day = today.toLocaleDateString('en-US', { day: 'numeric' });
                let newNote = firestore.collection('users').doc(user.uid).collection('notes').doc();
                newNote.set({
                    tag: tag,
                    color: color,
                    name: name,
                    star: false,
                    value: '',
                    id: newNote.id,
                    trash: false,
                    date: `${month}. ${day}`
                }).then(() => {
                    switch(activeRoute) {
                        case 'all':
                            dispatch(getAllNotes());
                            break;
                        case 'star':
                            dispatch(getStarNotes());
                            break;
                        case 'trash':
                            dispatch(getTrashNotes());
                            break;
                        default: dispatch(getTagNotes(activeRoute));
                    }
                    dispatch({
                        type: 'SET_PROCESS',
                        data: false
                    })
                }).catch(err => {
                    console.log(err);
                })
            }
        });
    }
}

export const updateNote = (id, type, newValue, activeRoute, getNewNoteAfter) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        dispatch({
            type: 'SET_PROCESS',
            data: true
        })

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
                    });
                }).then(() => {
                    switch(activeRoute) {
                        case 'all':
                            dispatch(getAllNotes());
                            break;
                        case 'star':
                            dispatch(getStarNotes());
                            break;
                        case 'trash':
                            dispatch(getTrashNotes());
                            break;
                        default: dispatch(getTagNotes(activeRoute));
                    }
                    dispatch({
                        type: 'SET_PROCESS',
                        data: false
                    })
                    if (getNewNoteAfter) {
                        dispatch(getSpecificNote(id));
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        });
    }
}

//---------------------------

export const createNewTag = (color, name) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        if (name.length > 15) {
            dispatch({
                type: 'SET_MODAL_ERROR_MESSAGE',
                data: 'Tag name is too long! Max length is 15 characters!'
            })
            return false;
        }

        dispatch({
            type: 'SET_PROCESS',
            data: true
        })

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firestore.collection('users').doc(user.uid).get().then(doc => {
                    if (!doc.data().tags[name]) {
                        firestore.collection('users').doc(user.uid).set({
                            tags: {
                                [name]: {
                                    color: color
                                }
                            }
                        }, { merge: true }).then(() => {
                            dispatch({
                                type: 'SET_PROCESS',
                                data: false
                            });
                            dispatch({
                                type: 'UPDATE_MODAL',
                                data: null
                            });
                        }).catch(err => {
                            console.log(err);
                        })
                    } else {
                        dispatch({
                            type: 'SET_PROCESS',
                            data: false
                        });
                        dispatch({
                            type: 'SET_MODAL_ERROR_MESSAGE',
                            data: 'Tag with this name already exist!'
                        })
                    }
                })
            }
        });
    }
}

export const removeTag = (tag, activeNote) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        dispatch({
            type: 'SET_PROCESS',
            data: true
        })
        dispatch({
            type: 'SET_REMOVING_TAG',
            data: true
        })

        if (activeNote) {
            if (activeNote.tag === tag) {
                dispatch({
                    type: 'CLEAR_ACTIVE_NOTES',
                });
            }
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firestore.collection('users').doc(user.uid).update({
                    ['tags.'+tag]: firebase.firestore.FieldValue.delete()
                }).then(() => {
                    firestore.collection('users').doc(user.uid).collection('notes').where("tag", "==", tag).get().then(snapshot => {
                        let notes = snapshot.docs.map(doc => doc.data());
                        const deletingNotes = notes.map(item => {
                            return firestore.collection('users').doc(user.uid).collection('notes').doc(item.id).delete();
                        });
                        
                        Promise.all(deletingNotes).then(() => {
                            dispatch({
                                type: 'UPDATE_ROUTE',
                                route: 'all'
                            })
                            dispatch(getAllNotes());
                            dispatch({
                                type: 'SET_PROCESS',
                                data: false
                            })
                            dispatch({
                                type: 'SET_REMOVING_TAG',
                                data: false
                            })
                        })
                    })
                })
            }
        })
    }
}