import React from "react";
import { Link, Outlet } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ArticleIcon from '@mui/icons-material/Article';
import Button from '@mui/material/Button';
function HomeNav() {


    const Style={
        margin:'15px',
    }
  return (
    <>
      <div className="container-fluid">
        <div  className="d-flex justify-content-center">
        <Link style={Style} to="/home/"><Button endIcon={<HomeIcon></HomeIcon>} color='primary'>Home</Button></Link>
          <Link style={Style} to="/home/createjob"> <Button endIcon={<AddBoxIcon></AddBoxIcon>} color='primary'>Create job</Button> </Link>
          <Link style={Style} to="/home/available"> <Button endIcon={<EventAvailableIcon></EventAvailableIcon>} color='primary'>Available jobs</Button></Link>
          <Link style={Style} to="/home/articles"> <Button endIcon={<ArticleIcon></ArticleIcon>} color='primary'>Articles</Button></Link>
        </div>
      </div>
        {/* <Link style={Style} to="/home/"><Button endIcon={<HomeIcon></HomeIcon>} color='primary'>Home</Button></Link> */}

      <Outlet></Outlet>
      
    </>
  );
}

export default HomeNav;
