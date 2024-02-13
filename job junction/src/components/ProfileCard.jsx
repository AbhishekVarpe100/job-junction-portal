import React, { useEffect, useState } from "react";
import "../css/ProfileCard.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../css/spinner.css";
import profile from "./profile.png";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
function ProfileCard() {
  const [spin, setSpinner] = useState(true);

  const [username, setUser] = useState(localStorage.getItem("name"));
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [photo, setPhoto] = useState();
  const navigate=useNavigate();


  const [data,setData]=useState([]);

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 2000);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:2000/getphoto",{params:{ username, password }})
      .then((res) => {
        setPhoto(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(()=>{

    axios.get('http://localhost:2000/getinfo',{params:{username,password}})
    .then(res=>{
      setData(res.data);
    })
    .catch((err)=>{
      
    })
  },[])


  const handleDelete=(name,password)=>{
    axios.delete('http://localhost:2000/deletephoto',{data:{name,password}})
    .then((res)=>{
      if(res.data=='success'){
      window.location.reload(true);
      }
    })
  }


  const deleteInfo=(id)=>{
    let auth=confirm("Do you want to delete profile? if not cancel.");
    if(auth){
      axios.delete("http://localhost:2000/deleteinfo/"+id)
      .then((res)=>{
        window.location.reload(true);
  
      })
      .catch(err=>console.log(err))
    }
  
  }

  return (
    <div>
      
      {spin ? (
        <center>
          <span className="loader"></span>
        </center>
      ) : (<><u className="m-4 p-4"><Link to='/home'>Back To Home <i className="fa-solid fa-house"></i></Link></u>
        <div className="card">
          <strong>Your profile</strong>
          <center>
            <img id="image" src={photo?`http://localhost:2000/Images/${photo}`:profile} alt="John" />
            {/* <img className="card-img-top" src={} alt="Card image cap" />  */}
            <br />

            {
              photo?
              <div><Link to="/editphoto">
              <i title="Edit photo" className="fa-solid fa-pen-to-square" id="upload"></i></Link>

              <Link ><i onClick={()=>handleDelete(username,password)} title="Delete photo" className="fa-solid fa-trash" id="delete"></i></Link>
              
            </div>
            :
            <><label htmlFor="upload">Upload profile photo</label>
            <Link to="/upload">
              <i className="fa-solid fa-upload" id="upload"></i>
            </Link></>
            }

          </center>
          {
            data.length==0?<Link to="/create"><u><small>Create Profile</small></u></Link>
            
            :
            <>
            <h3>{data.firstname} {data.lastname}</h3>
          <br />
          <span><b>Designation you want </b></span><span className="title">{data.desig}</span>
          <br />
          <span><b>Your skills </b></span><span className="title">{data.skills}</span>
          <br />
          <span><b>Experience</b></span><span className="title">{data.exp}</span>
          <br />
        
          <p>
            <Link to={`/editinfo/${data.id}`}><button className="b">Edit profile {<EditIcon></EditIcon>}</button></Link>
            <button onClick={()=>deleteInfo(data.id)} className="b2">Delete profile {<DeleteIcon></DeleteIcon>}</button>
          
            
          </p>
            </>

          }
          
          
        </div>
        </>)}
    </div>
  );
}

export default ProfileCard;
