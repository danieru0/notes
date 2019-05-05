import React from 'react';
import { connect } from 'react-redux';

import LeftMenu from './components/leftMenu/LeftMenu';
import MiddleMenu from './components/middleMenu/MiddleMenu';
import Editor from './components/editor/Editor';
import Auth from './components/Auth/Auth';

import './App.css';

function App() {

  const logged = true;

  return (
    <div className="App">
      {
        logged ? (
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
  console.log(state);
  return {
    test: state.testReducer.test
  }
}

export default connect(mapStateToProps, null)(App);
