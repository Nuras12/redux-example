import React from 'react';
import { postApi } from '../services_v1/index';
import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

import store from '../store';
import { actions, postSelector } from '../reducers';
import { randomInteger } from '../utils';
import style from '../Styles/Posts';
import { useSelector, useDispatch } from 'react-redux'

const { dispatch } = store;

export const Posts = () => {

    interface IPost {
      userId: number;
      id?: number;
      title: string;
      body: string;
    }
  
    const { error, data, isLoading } = useSelector(postSelector);
    console.log(isLoading, 'Data');
    const [title, setTitle]: [string, (title: string) => void] = React.useState("");
    const [body, setBody]: [string, (body: string) => void] = React.useState("");
  
    const getPosts = () => {
      dispatch(actions.setIsLoading(true))

      const options = { headers: { "Content-Type": "application/json" } };

      const responseHandler = (response: AxiosResponse) => {
        dispatch(actions.ADD_ITEMS(response.data));
        dispatch(actions.setIsLoading(false))
      }

      const errorHandler = (ex: AxiosError) => {
        dispatch(actions.setError(ex.response?.status === 404 ? "Resource not found" : "An unexpected error has occurred"))
        dispatch(actions.setIsLoading(false))
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
      dispatch(actions.ADD_ITEM({...response.data.body, id: response.data.id}));
    };
 
    React.useEffect(() => getPosts(), []);

    return (
      <>
      <h1>Is loading status: {isLoading ? "True" : "False"}</h1>
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
          {
          data ?
          data.map((post) => (
          <li key={post.id}>
            <h3>Post title: {post.title}</h3>
            <p>Post body : {post.body}</p>
          </li>
        ))
        : null
        }
        </ul>
        {error && <p className="error">{error}</p>}
      </>
    );
  }
  
  export default Posts;
  