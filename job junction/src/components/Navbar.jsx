import React, { useEffect } from "react";
import {Link} from 'react-router-dom';
function Navbar() {
  const empty=()=>{
    window.location.reload(true);
    localStorage.removeItem('name')
    navigate('/');
  }
  let show=false;
  if(localStorage.getItem('name')){
    show=true;
  }
  
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
