import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import '../css/Applicants.css'
import { Link } from 'react-router-dom';
function Applicants() {


    const [data,setData]=useState([]);
    const [username,setUserName]=useState(localStorage.getItem('name'))
    const [password,setPassword]=useState(localStorage.getItem('password'))


    const fetchData=()=>{
        axios.get('http://localhost:2000/getapplicants',{params:{username,password}})
        .then(res=>{
            setData(res.data)
        })
        .catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        fetchData();
    },[])

    const handleDelete=(id,username,pass,skills,title)=>{
        axios.delete('http://localhost:2000/deleteapplicant',{params:{id,username,pass,skills,title}})
        .then((res)=>{
            if(res){
                alert("Deleted")
                fetchData();
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const handleHire=(id,username,pass,skills,title)=>{
        axios.delete('http://localhost:2000/hire',{params:{id,username,pass,skills,title}})
        .then((res)=>{
            if(res){
                alert("Hired")
                fetchData();
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }


  return (
    <div className="container">
  <h2>Applicants</h2>

  <Link to='/profile'>Back</Link>

  <table className="table table-hover table-bordered table-striped text-center">
    <thead className=''>
      <tr>
        <th>Profile Photo</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Designation</th>
        <th>Skills</th>
        <th>Category</th>
        <th>Experience</th>
      </tr>
    </thead>
    <tbody>
        {data.map((emp)=>(
      <tr key={emp.id} className="tablerow">
        <td><img id="image" src={`http://localhost:2000/Images/${emp.photo}`} alt="profile photo" /></td>
        <td>{emp.firstname}</td>
        <td>{emp.lastname}</td>
        <td>{emp.designation}</td>
        <td>{emp.skills}</td>
        <td>{emp.category}</td>
        <td>{emp.exp}</td>

       
        <td>
        <button onClick={()=>handleHire(emp.id,emp.username,emp.pass,emp.skills,emp.title) }className='btnapplicant btn btn-primary m-2'>Hire</button>
        
        <button onClick={()=>handleDelete(emp.id,emp.username,emp.pass,emp.skills,emp.title)} className='btnapplicant btn btn-danger m-2'>Delete</button>
        </td>
      </tr>
        ))}
      
    </tbody>
  </table>
</div>
  )
}

export default Applicants;