import { ADD_ITEM, ADD_ITEMS } from '../actions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import { stat } from 'fs';


const initialState = {
    data: [],
    error: null,
};


  export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
      ADD_ITEM: (state, {payload}) => {
        const exists = state.data.find(x => x.id === payload.id);
        state.data = exists ? state.data : [...state.data, payload];
      },
      ADD_ITEMS: (state, { payload }) => {
            state.data = [ ...state.data, ...payload ]
        },/*
        setAuthFailed: (state, { payload }: PayloadAction) => {
            state.error = payload
            state.isAuth = false
        },*/
    },
})


export const { actions, reducer } = postSlice;

export default combineReducers({ posts: reducer })
  
