import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
function EditPhoto() {
  const [file, setPhoto] = useState("");
    const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(photo);
    if(!file){
        alert("Choose a photo to upload");
    }
    else{
        let name=localStorage.getItem('name');
        let password=localStorage.getItem('password');
        let formdata = new FormData();
        formdata.append('name',name);
        formdata.append('password',password);
        formdata.append("file", file);
        axios.put("http://localhost:2000/editphoto", formdata).then((res) => {
          if (res.data == "uploaded") {
            alert("Photo edited");
    
            setTimeout(() => {
                navigate('/profile')
            }, 1);
          } else {
            alert("Failed to upload");
          }
        });
    }
   
  };

  return (
    <div>
         <u className="m-4 p-4"><Link to='/profile'>Back To Profile</Link></u>
      <form>
        <center>
          <input
            className="w-75"
            onChange={(e) => setPhoto(e.target.files[0])}
            type="file"
            name=""
            id=""
          />

<br />
<Button onClick={handleSubmit}    color='primary' variant="contained" endIcon={<CloudUploadIcon></CloudUploadIcon>}>Upload New Photo</Button>
        
        </center>
      </form>
    </div>
  );
}

export default EditPhoto;
