import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const handleChanges = e => {
    setUser({
      ...user, [e.target.name] : e.target.value
    })
  }

  const handleLogin = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', user)
      .then(res => {
        console.log('Login Data: ', res.data)
        localStorage.setItem('token', res.data.payload)
      })
      .catch(err => {
        console.log('Problem logging in: ', err)
        localStorage.removeItem('token');
      })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <h3>Login to get started</h3>
      <form onSubmit={handleLogin}>
        <input 
        name='username'
        type='text'
        placeholder='Username'
        onChange={handleChanges}
        value={user.username}
        />
        <input 
        name='password'
        type='password'
        placeholder='Password'
        onChange={handleChanges}
        value={user.password}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
