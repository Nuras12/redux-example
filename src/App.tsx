import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Posts } from './components/Posts'
import store from './store';


function App() {


  return (
    <div className="App">
      <Posts />
    </div>
  );
}

export default App;
