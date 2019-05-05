import firebase from 'firebase/app';
import 'firebase/firebase-storage';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';

firebase.initializeApp({
    apiKey: "AIzaSyArzJtQxzr46vBp0ivjew7Gwf2oK0jODQk",
    authDomain: "notes-1fbc4.firebaseapp.com",
    databaseURL: "https://notes-1fbc4.firebaseio.com",
    projectId: "notes-1fbc4",
    storageBucket: "notes-1fbc4.appspot.com",
    messagingSenderId: "784731515037",
    appId: "1:784731515037:web:0c4793db80d595b1"
});

export default firebase;