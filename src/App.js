import React from 'react';
import { connect } from 'react-redux';

import LeftMenu from './components/leftMenu/LeftMenu';
import MiddleMenu from './components/middleMenu/MiddleMenu';
import Editor from './components/editor/Editor';
import Auth from './components/Auth/Auth';

import './App.css';

function App({auth}) {

  return (
    <div className="App">
      {
        auth.uid ? (
          <>
            <LeftMenu />
            <MiddleMenu />
            <Editor />
          </>
        ) : (
          <Auth />
        )
      }
    </div>
  );
}

const mapStateToProps = state => {
  return {
    test: state.testReducer.test,
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps, null)(App);
