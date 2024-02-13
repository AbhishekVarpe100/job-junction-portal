import React, { useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ArticleIcon from '@mui/icons-material/Article';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import '../css/Home.css'
function HomeNav() {


    const Style={
        margin:'15px',
    }

    const [collapse,setCollapse]=useState(true);

    const mobileRef=useRef(null);
    const handleButton=()=>{
      const element=mobileRef.current;
      if(collapse){
        element.style.display='block';
        setCollapse(!collapse);
      }
      else{
        element.style.display='none';
        setCollapse(!collapse);

      }
    }


  return (
    <>
      <div className="bigscreen container-fluid">
        <div  className="d-flex justify-content-center">
        <Link id="underline"  style={Style} to="/home/"><Button endIcon={<HomeIcon></HomeIcon>} color='primary'>Home</Button></Link>
          <Link id="underline" style={Style} to="/home/createjob"> <Button endIcon={<AddBoxIcon></AddBoxIcon>} color='primary'>Create job</Button> </Link>
          <Link id="underline" style={Style} to="/home/available"> <Button endIcon={<EventAvailableIcon></EventAvailableIcon>} color='primary'>Available jobs</Button></Link>
          <Link id="underline" style={Style} to="/home/articles"> <Button endIcon={<ArticleIcon></ArticleIcon>} color='primary'>Articles</Button></Link>
        </div>
      </div>

<center><button onClick={handleButton} className="mobilediv btn btn-primary">{!collapse?<CloseIcon></CloseIcon>:<MenuIcon></MenuIcon>}</button></center>
<center className="">
      <div ref={mobileRef} className="mobile container-fluid">
        <div  className="justify-content-center">
        <Link id="underline"  style={Style} to="/home/"><Button endIcon={<HomeIcon></HomeIcon>} color='primary'>Home</Button></Link>
        <br />
          <Link id="underline" style={Style} to="/home/createjob"> <Button endIcon={<AddBoxIcon></AddBoxIcon>} color='primary'>Create job</Button> </Link>
          <br />
          <Link id="underline" style={Style} to="/home/available"> <Button endIcon={<EventAvailableIcon></EventAvailableIcon>} color='primary'>Available jobs</Button></Link>
          <br />
          <Link id="underline" style={Style} to="/home/articles"> <Button endIcon={<ArticleIcon></ArticleIcon>} color='primary'>Articles</Button></Link>
        </div>
      </div>
      </center>


      <Outlet></Outlet>
      
    </>
  );
}

export default HomeNav;
