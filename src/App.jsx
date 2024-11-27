import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './MainRouter';
import './App.css';

window.globalVariable = false;

function App() {
  return (
    <Router>
      <MainRouter />
    </Router>
  );
}

export default App;
