import { ADD_ITEM, ADD_ITEMS } from '../actions';

interface action {
    type: String,
    value: any
}

const post = (state = [], action: action) => {
    if (action.type === ADD_ITEM) { 
      return [ ...state, action.value ]; 
    } else if (action.type === ADD_ITEMS) {
      return [ ...state, ...action.value ];
    } else { 
      return state;
    } 
  } 

export const firstManager = (state = { post: [] }, action: action) => { 
    return { 
      post: post(state.post, action), 
      //list: list(state.list, action), 
    } 
  }