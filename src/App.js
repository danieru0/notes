import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import LeftMenu from './components/leftMenu/LeftMenu';
import MiddleMenu from './components/middleMenu/MiddleMenu';
import Editor from './components/editor/Editor';
import Auth from './components/Auth/Auth';
import ProcessLoader from './components/ProcessLoader/ProcessLoader';
import Modal from './components/Modal/Modal';

import './App.css';

const StyledProcessLoader = styled(ProcessLoader)`
  opacity: ${({process}) => ( process ? '1' : '0' )};
  visibility: ${({process}) => ( process ? 'visible' : 'hidden' )}; 
  transition: opacity .3s, visibility .3s;
`

function App({auth, process, activeModal}) {
  
  return (
    <div className="App">
      {
        auth.uid ? (
          <>
            <LeftMenu />
            <MiddleMenu />
            <Editor />
            <StyledProcessLoader process={process}/>
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