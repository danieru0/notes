import testReducer from './testReducer';
import authReducer from './authReducer';

import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

export default combineReducers({
    testReducer: testReducer,
    authReducer: authReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});