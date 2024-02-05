// SignUpForm.js

import React, { useState } from 'react';
import '../css/SignUpForm.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const SignUpForm = () => {

  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [signup,setSignUp]=useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:2000/register",{name,email,password})
      .then((res) => {
        if (res.data === 'success') {
          setTimeout(() => {
            setSignUp("Successfully sign up");
            setTimeout(() => {
              setSignUp("")
              setName("");
              setEmail("");
              setPassword("");
            }, 3000);
          }, 1000);

          
        }
        else if(res.data=='present'){
          setTimeout(() => {
            setSignUp("Email already exist try another");
            setTimeout(() => {
              setSignUp("")
              setName("");
              setEmail("");
              setPassword("");
            }, 3000);
          }, 1000);
        }
      })
      .catch((error) => {
        alert("Error while posting")
      });
  };

  return (
    <div className="signup-form-container logindiv">
      <form className="signup-form text-white" onSubmit={handleSubmit}>
        <h2><center>SignUp</center></h2>
        
      <h2><center>Job_Junction<i class="fa-solid fa-graduation-cap"></i></center></h2>
      <center><small>The best platform to find job of your choice</small></center>
        <label htmlFor="name">Name:</label>
        <input className='form-control'  title='Enter username'
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input className='form-control' title='Enter your email'
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input className='form-control' title='Enter password'
          type="password"
          id="password" 
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <input title='sign up' id='submit' type="submit" value={signup?signup:"SignUp"} />
      <span>Already have account? </span><Link to='/' className="text-white">Login here</Link>
      </form>
    </div>
  );
};

export default SignUpForm;
