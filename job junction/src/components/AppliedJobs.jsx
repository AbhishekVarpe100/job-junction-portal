import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function AppliedJobs() {
    
    const [data,setData]=useState([]);
    const [username,setUserName]=useState(localStorage.getItem('name'))
    const [password,setPassword]=useState(localStorage.getItem('password'))



    const fetchData=()=>{
        axios.get('http://localhost:2000/appliedjobs',{params:{username,password}})
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



    const handleDelete=(id)=>{
        axios.delete('http://localhost:2000/deleteapply',{params:{id}})
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

  return (
    <div className="container">
  <h2>Applied jobs</h2>

  <Link to='/profile'>Back</Link>

  <table className="table table-hover table-bordered table-striped text-center">
    <thead className=''>
      <tr>
        
        <th>Created by</th>
        <th>Company Name</th>
        <th>Job Title</th>
        <th>Job Type</th>
        <th>Job Category</th>
        <th>Job Location</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>

        {data.map((emp)=>(
      <tr key={emp.id} className="tablerow">
        <td>{emp.createdby}</td>
        <td>{emp.companyname}</td>
        <td>{emp.jobtitle}</td>
        <td>{emp.jobtype}</td>
        <td>{emp.jobcategory}</td>
        <td>{emp.joblocation}</td>
        <td>{emp.status==null?<>pending <button onClick={()=>handleDelete(emp.id)} className='bg-warning text-white'>Delete</button> </>:(emp.status==false?<>Skills are not relevant <button onClick={()=>handleDelete(emp.id)} className='bg-danger text-white'>Delete</button></>:(emp.status==true?<>You are hired <button onClick={()=>handleDelete(emp.id)} className='bg-success text-white'>Delete</button></>:<></>))}</td>
        
      </tr>
        ))}

      
    </tbody>
  </table>
</div>
  )
}

export default AppliedJobs;