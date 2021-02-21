import React from 'react';
import { Provider } from 'react-redux'

import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Posts } from './components/Posts'
import store from './store';


function App() {


  return (
    <div className="App">
      <Provider store={store}>  
        <Posts />
      </Provider>
    </div>
  );
}

export default App;
