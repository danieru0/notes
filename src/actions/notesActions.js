export const getAllNotes = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firestore.collection('users').doc(user.uid).collection('notes').get().then(snapshot => {
                    let notes = snapshot.docs.map(doc => doc.data());
                    console.log(notes);
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
                firestore.collection('users').doc(user.uid).collection('notes').where("star", "==", true).get().then(snapshot => {
                    let notes = snapshot.docs.map(doc => doc.data());
                    console.log(notes);
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
                    console.log(notes);
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
                    console.log(notes);
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