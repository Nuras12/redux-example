//import { createStore } from "@reduxjs/toolkit";
import { createStore } from 'redux';
import { firstManager } from '../reducers';

export default createStore(firstManager);