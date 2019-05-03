import React from 'react';

import LeftMenu from './components/leftMenu/LeftMenu';
import MiddleMenu from './components/middleMenu/MiddleMenu';
import Editor from './components/editor/Editor';

import './App.css';

function App() {
  return (
    <div className="App">
      <LeftMenu />
      <MiddleMenu />
      <Editor />
    </div>
  );
}

export default App;
