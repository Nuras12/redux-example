import React from 'react';
import { postApi } from '../services_v1/index'
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import style from '../Styles/Posts';


export const Posts = () => {

    interface IPost {
      userId: number;
      id?: number;
      title: string;
      body: string;
    }
  
    const defaultProps:IPost[] = [];
  
    const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultProps);
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
    const [error, setError]: [string, (error: string) => void] = React.useState("");

    const [title, setTitle]: [string, (title: string) => void] = React.useState("");
    const [body, setBody]: [string, (body: string) => void] = React.useState("");
  
    function randomInteger(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  


    const getPosts = () => {

      const options = { headers: { "Content-Type": "application/json" } };

      const responseHandler = (response: AxiosResponse) => {
        setPosts(response.data);
        setLoading(false);
      }

      const errorHandler = (ex: AxiosError) => {
        setError(ex.response?.status === 404 ? "Resource not found" : "An unexpected error has occurred");
        setLoading(false);
      }

      postApi.get<IPost[]>("/posts", options).then(responseHandler).catch(errorHandler);  
    }


    const postData = (userId: Number, title: string, body: string) => {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          body: body,
          userId: userId
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((json) => {
          console.log('JSON',json);
          setPosts([json, ...posts]);
        });
    };


  
    React.useEffect(() => getPosts(), []);

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
  