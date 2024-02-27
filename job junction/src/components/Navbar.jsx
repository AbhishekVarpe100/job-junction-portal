import React, { useEffect,useState } from "react";
import {Link} from 'react-router-dom';
import '../css/Navbar.css'
function Navbar() {

  const [username,setUser]=useState(localStorage.getItem('name'))
  const [password,setPassword]=useState(localStorage.getItem('password'))
  const [show,setShow]=useState(false)

  
  const empty=()=>{
    window.location.reload(true);
    localStorage.removeItem('name')
    localStorage.removeItem('password')
    navigate('/');
    
  }

  useEffect(()=>{
if(username && password){
  setShow();
  setShow(true)
  
}
else{
  setShow(false)
}
  },[])

  
  
  return (
    <div className="m-2">
      <nav className="navbar navbar-expand-lg navbar-light justify-content-around">
        <h2>Job Junction<i className="fa-solid fa-graduation-cap"></i></h2>
        <Link to="/home"></Link>  
        {
          show?<button className="btn btn-dark"><Link onClick={empty} className="text-white" to="/logout"> Log Out</Link></button>: <button className="btn btn-dark"><Link className="text-white" to="/signup"> SignUp </Link> /
          <Link className="text-white" to="/"> Login </Link></button>
        }

        
      </nav>
    </div>
  );
}

export default Navbar;
