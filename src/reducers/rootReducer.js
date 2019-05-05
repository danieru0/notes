import testReducer from './testReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import { combineReducers } from 'redux';

export default combineReducers({
    testReducer: testReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});