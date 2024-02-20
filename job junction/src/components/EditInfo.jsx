import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function EditInfo() {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [create, setCreate] = useState("");
  const navigate = useNavigate();
  //   const [photo, setPhoto] = useState("");

  let username = localStorage.getItem("name");
  let password = localStorage.getItem("password");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(firstName,lastName,designation,skills,experience,photo);
    axios
      .put(`http://localhost:2000/editinfo/${id}`, {
        username,
        password,
        firstName,
        lastName,
        designation,
        skills,
        experience,
      })
      .then((res) => {
        if (res.data == "edited") {
          setTimeout(() => {
            setCreate(
              <div className="alert alert-success">
                Profile edited successfully
              </div>
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

  useEffect(() => {
    axios
      .get("http://localhost:2000/getinfo", { params: { username, password } })
      .then((res) => {
        setFirstName(res.data.firstname);
        setLastName(res.data.lastname);
        setDesignation(res.data.desig);
        setExperience(res.data.exp);
        setSkills(res.data.skill);
      })
      .catch((err) => {});
  }, []);

  return (
    <div>
        
      <center>
        <h2>Edit your profile</h2>
        <form
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
          <select required value={experience} onChange={(e) => setExperience(e.target.value)}>
            <option value="">---choose experience---</option>
            <option value="fresher">fresher</option>
            <option value="0-2 yrs">0-2 yrs</option>
            <option value="2-5 yrs">2-5 yrs</option>
            <option value=">5 yrs">More than 5 yrs</option>
          </select>
          <br />
          <br />
          <input onClick={handleSubmit}
            className="btn w-50 btn-primary"
            type="submit"
            value="Edit profile"
          />

<br />
          <Link to="/profile"><input
            className="btn w-50 btn-secondary"
            type="submit"
            value="Cancel"
          /></Link>

          <div>{create}</div>
        </form>
    
      </center>
    </div>
  );
}

export default EditInfo;
