import reduces from '../reducers';


import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';


export default configureStore({
 reducer: reduces,
 devTools: true,
});