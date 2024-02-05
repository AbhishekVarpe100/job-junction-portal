import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import background from "./background.jpg";
import profile from "./profile.png";
import "../css/Img.css";
import HomeNav from "./HomeNav";
import HomeRoutes from "./HomeRoutes";
function Home() {
  const [username, setName] = useState(localStorage.getItem("name"));
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:2000/getphoto", { params: { username, password } })
      .then((res) => {
        setPhoto(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (

      <div>
        <div className="d-flex justify-content-between m-4">
          <h1>Hello {username}</h1>
          <Link to="/profile">
            <img
              title="Profile"
              id="image"
              src={photo ? `http://localhost:2000/Images/${photo}` : profile}
              alt="profile photo"
            />
          </Link>
        </div>
        <HomeNav></HomeNav>
      </div>
  );
}

export default Home;
