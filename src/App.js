import React from 'react';
import { connect } from 'react-redux';

import LeftMenu from './components/leftMenu/LeftMenu';
import MiddleMenu from './components/middleMenu/MiddleMenu';
import Editor from './components/editor/Editor';
import Auth from './components/Auth/Auth';
import Modal from './components/Modal/Modal';

import './App.css';

function App({auth, process, activeModal}) {
  
  return (
    <div className="App">
      {
        auth.uid ? (
          <>
            <LeftMenu />
            <MiddleMenu />
            <Editor />
            <Modal type={activeModal} />
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
    auth: state.firebase.auth,
    process: state.notesReducer.process,
    activeModal: state.modalReducer.activeModal
  }
}

export default connect(mapStateToProps, null)(App);