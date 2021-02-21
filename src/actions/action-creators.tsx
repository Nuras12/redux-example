import { ADD_ITEM, ADD_ITEMS } from './index';

export const addPost = (item: any) => {
    return { type: ADD_ITEM, value: item }
}

export const addPosts = (posts: []) => {
    return { type: ADD_ITEMS, value: posts }
}