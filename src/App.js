import React from 'react';
import { connect } from 'react-redux';

import { getAllNotes, getStarNotes,getTrashNotes, getSpecificNote, getTagNotes, createNewNote, updateNote } from './actions/notesActions';

import LeftMenu from './components/leftMenu/LeftMenu';
import MiddleMenu from './components/middleMenu/MiddleMenu';
import Editor from './components/editor/Editor';
import Auth from './components/Auth/Auth';

import './App.css';

function App({auth, getAllNotes, getStarNotes, getTrashNotes, getSpecificNote, getTagNotes, createNewNote, updateNote}) {

  //getAllNotes();
  //getStarNotes();
  //getTrashNotes();
  //getSpecificNote('vEJmo22MahTmwPqoEIij');
  //getTagNotes('Article');
  //createNewNote('Article', 'red', 'elo mordo');
  //updateNote('w2pKVh64AeBANaWz8oGI', 'text', 'ah shit here we go again');
  //updateNote('w2pKVh64AeBANaWz8oGI', 'star', true);
  //updateNote('w2pKVh64AeBANaWz8oGI', 'trash', true);
  
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

export default connect(mapStateToProps, { getAllNotes, getStarNotes, getTrashNotes, getSpecificNote, getTagNotes, createNewNote, updateNote })(App);