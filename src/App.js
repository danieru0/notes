import React from 'react';
import { connect } from 'react-redux';

import { getAllNotes, getStarNotes,getTrashNotes, getSpecificNote, getTagNotes } from './actions/notesActions';

import LeftMenu from './components/leftMenu/LeftMenu';
import MiddleMenu from './components/middleMenu/MiddleMenu';
import Editor from './components/editor/Editor';
import Auth from './components/Auth/Auth';

import './App.css';

function App({auth, getAllNotes, getStarNotes, getTrashNotes, getSpecificNote, getTagNotes}) {

  //getAllNotes();
  //getStarNotes();
  //getTrashNotes();
  //getSpecificNote('vEJmo22MahTmwPqoEIij');
  //getTagNotes('Article');

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
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps, { getAllNotes, getStarNotes, getTrashNotes, getSpecificNote, getTagNotes })(App);