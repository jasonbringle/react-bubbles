import React, { useState } from "react";
import axiosWithAuth from '../util/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [ values, setValues ] = useState({
    username:'',
    password: ''
  })

  const { push } = useHistory()

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const submitForm = e => {
    e.preventDefault();
    axiosWithAuth()
    .post("/login", values)
    .then(res => {
      localStorage.setItem("token", res.data.payload);
      push("/private-route")})
    .catch(err => console.log(err.message, err.response))

  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={submitForm}>
        <input type='text' name='username' placeholder='User Name' value={values.username} onChange={handleChange}/>
        <input type='text' name='password' placeholder='Password' value={values.password} onChange={handleChange}/>
        <button >Login</button>
      </form>
    </>
  );
};

export default Login;
