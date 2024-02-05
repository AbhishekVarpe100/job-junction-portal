import React, { useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
function CreateProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [create, setCreate] = useState("");
  const navigate = useNavigate();
  //   const [photo, setPhoto] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(firstName,lastName,designation,skills,experience,photo);
    let username = localStorage.getItem("name");
    let password = localStorage.getItem("password");

    axios
      .post("http://localhost:2000/createprofile", {
        username,
        password,
        firstName,
        lastName,
        designation,
        skills,
        experience,
      })
      .then((res) => {
        if (res.data == "added") {
          setTimeout(() => {
            setCreate(
              <div className="alert alert-success">Profile is created</div>
            );
            setTimeout(() => {
              setFirstName("");
              setLastName("");
              setDesignation("");
              setSkills("");
              setExperience("");
              setCreate("");
              setTimeout(() => {
                navigate("/profile");
              }, 1000);
            }, 3000);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(formdata);
  };

  return (
    <div>
        <u className="m-4 p-4"><Link to='/profile'>Back To Profile</Link></u>
      <center>
        <h2>Create your profile</h2>
        <form
          onSubmit={handleSubmit}
          className="w-75 border border-secondary p-4 justify-content-start"
        >
          <input required
            value={firstName}
            type="text"
            id="first"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
          <input required
            value={lastName}
            type="text"
            id="last"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
          <input required
            value={designation}
            type="text"
            id="designation"
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="Enter designation you want"
          />
          <textarea required
            value={skills}
            id="skills"
            onChange={(e) => setSkills(e.target.value)}
            cols="100"
            rows="7"
            placeholder="Enter your skills"
          ></textarea>

          <br />
          <select value={experience} required onChange={(e) => setExperience(e.target.value)}>
            <option value="">---choose experience---</option>
            <option value="fresher">fresher</option>
            <option value="0-2 yrs">0-2 yrs</option>
            <option value="2-5 yrs">2-5 yrs</option>
            <option value=">5 yrs">More than 5 yrs</option>
          </select>
          <br />
          <br />
          <input
            className="btn w-50 btn-primary"
            type="submit"
            value="Create profile"
          />

          <div>{create}</div>
        </form>
      </center>
    </div>
  );
}

export default CreateProfile;
