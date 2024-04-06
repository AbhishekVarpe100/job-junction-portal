import React, { useState } from "react";
import "../css/SignUpForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = ({ onChildData }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");

  

  const handleSubmit = (e) => {
    e.preventDefault();

    

    axios
      .post("http://localhost:2000/login", { name, password })
      .then((res) => {
        if (res.data === "login") {

          localStorage.setItem('name', name);
          localStorage.setItem('password', password);

          
            setLogin("Login Successful");
            setTimeout(() => {
              setLogin("");
              navigate("/home");
              const sendDataToParent = () => {
                onChildData(name,password);
              };
              sendDataToParent();
            }, 3000);
        
        } else if (res.data === "failed") {
          setTimeout(() => {
            setLogin("Incorrect password");
            setTimeout(() => {
              setLogin("");
              setName("");
              setPassword("");
            }, 3000);
          }, 1000);
        } else if (res.data == "user_not_found") {
          setTimeout(() => {
            setLogin("User not found");
            setTimeout(() => {
              setLogin("");
              setName("");  
              setPassword("");
            }, 3000);
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="signup-form-container logindiv">
      <form className="signup-form text-white" onSubmit={handleSubmit}>
        <h2>
          <center>Login</center>
        </h2>
        <label htmlFor="name">Name:</label>
        <input
          className="form-control"
          title="Enter username"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          className="form-control"
          title="Enter password"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          title="login"
          id="submit"
          type="submit"
          value={login ? login : "login"}
        />
        <Link to='/signup' className="text-white">Create account</Link>
      </form>
    </div>
  );
};

export default Login;
