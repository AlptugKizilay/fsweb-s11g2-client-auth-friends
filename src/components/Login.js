import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';


const Login = () => {
    const [credentials, setCredentials] = useState({});
    const history = useHistory();
    const { isLoggedIn, localStorageKey, setIsLoggedIn, setLoggedInToken} = useContext(AuthContext);
    
    const handleChange = e => {
        setCredentials({
          ...credentials,
          [e.target.name]: e.target.value,
        })
    }

      const myLogin = () => {
        axios
          .post("http://localhost:9000/api/login", {
            username: credentials.username,
            password: credentials.password,
          })
          .then((res) => {
            localStorage.setItem(localStorageKey,res.data.token);
            setIsLoggedIn(true);
            setLoggedInToken(res.data.token);
            history.push("/friends-list/");
            console.log(res.data);
            console.log(localStorageKey, isLoggedIn);
          })
      }
      const handleSubmit = (e) => {
        e.preventDefault();
        myLogin();

      }
    useEffect(()=>{console.log(credentials)},[credentials])
    useEffect(()=>{
      if(isLoggedIn) {
        console.log(isLoggedIn);
        return history.push("/friends-list")

      }
    },[])
    
    return (
        <div>
          <form onSubmit={handleSubmit}>
            <label name="username">USERNAME</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
            />
            <label name="password">PASSWORD</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
            <button>SUBMIT</button>
          </form>
        </div>
      )
}
export default Login;