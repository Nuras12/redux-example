import React from 'react';
import { postApi } from '../services_v1/index';
import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

import store from '../store';
import { addPost, addPosts } from '../actions/action-creators';
import { randomInteger } from '../utils';
import style from '../Styles/Posts';

const { dispatch } = store;

export const Posts = () => {

    interface IPost {
      userId: number;
      id?: number;
      title: string;
      body: string;
    }
  
    const defaultProps:IPost[] = [];
  
    const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(store.getState().post);
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
    const [error, setError]: [string, (error: string) => void] = React.useState("");

    const [title, setTitle]: [string, (title: string) => void] = React.useState("");
    const [body, setBody]: [string, (body: string) => void] = React.useState("");
  
    const getPosts = () => {

      const options = { headers: { "Content-Type": "application/json" } };

      const responseHandler = (response: AxiosResponse) => {
        dispatch(addPosts(response.data));
        //setPosts(response.data);
        setLoading(false);
      }

      const errorHandler = (ex: AxiosError) => {
        setError(ex.response?.status === 404 ? "Resource not found" : "An unexpected error has occurred");
        setLoading(false);
      }

      postApi.get<IPost[]>("/posts", options).then(responseHandler).catch(errorHandler);  
    }


    const postData = async (userId: Number, title: string, body: string) => {

      const options = {
        method: "POST",
        body: {
          title: title,
          body: body,
          userId: userId  
        }
      }

      const response = await postApi.post("https://jsonplaceholder.typicode.com/posts", options);
      const postAction = addPost({...response.data.body, id: response.data.id});
      if (!posts.find(p => p.id === response.data.id)){
        dispatch(postAction);
      }
      
      //setPosts([{...response.data.body, ...response.data.id}, ...posts]);
    };
 
    React.useEffect(() => {
      console.log('object');
      const unsubscribe = store.subscribe(() => setPosts(store.getState().post));
      getPosts();
    }, []);

    return (
      <>
          <label>Title:</label>
          <input
            style={style.form.inputs}
            className="userFirstname"
            value={title}
            name="title"
            onChange={(event) => setTitle(event.target.value)}
            type="text"
          />
          <br />
          <label>Body:</label>
          <br />
          <input
            style={style.form.inputs}
            value={body}
            name="body"
            onChange={(event) => setBody(event.target.value)}
            type="text"
          />
          <br />
          <input
            style={style.form.submitBtn}
            className="submitButton"
            type="submit"
            value="Post Data"
            onClick={() => {
              const userId = randomInteger(0, 1000);
              postData(userId, title, body);
            }}
          />
        <ul className="posts">
          {posts.map((post) => (
          <li key={post.id}>
            <h3>Post title: {post.title}</h3>
            <p>Post body : {post.body}</p>
          </li>
        ))}
        </ul>
        {error && <p className="error">{error}</p>}
      </>
    );
  }
  
  export default Posts;
  