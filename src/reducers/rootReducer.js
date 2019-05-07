import authReducer from './authReducer';
import routesReducer from './routesReducer';
import notesReducer from './notesReducer';
import modalReducer from './modalReducer';

import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

export default combineReducers({
    authReducer: authReducer,
    routesReducer: routesReducer,
    notesReducer: notesReducer,
    modalReducer: modalReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});