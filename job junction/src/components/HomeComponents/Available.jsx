import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../css/Available.css';

function Available() {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem('name'));
  const [password, setPassword] = useState(localStorage.getItem('password'));
  const [photo, setPhoto] = useState('');
  const [applyData, setApplyData] = useState([]); // Initialize applyData as an object
  const [userData,setUserData]=useState([]);

  const getData = () => {
    axios.get('http://localhost:2000/getjobs')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (Object.keys(applyData).length !== 0 && Object.keys(userData).length !== 0 ) {
      // Ensure applyData is not empty
      storeApplyData();
    }
  }, [applyData,userData]);

 




  function storeApplyData(){
    // Check if applyData is not empty
    
    const dataToSend={
      ...applyData,
      ...userData,
      'photo':photo,
      'applicant':username,
      'appli_password':password
    }

    axios.post('http://localhost:2000/applytojob',dataToSend)
    .then(res => {
      // Handle successful response if needed
      setTimeout(() => {
        alert("Applied successfully!")
      }, 1000);
    })
    .catch(err => {
      console.log(err)
    });
    
  }


  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:2000/deletejob/${id}`)
      .then((res) => {
        alert("Deleted")
        getData();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleApply = (id) => {
    axios.get("http://localhost:2000/getphoto", { params: { username, password } })
      .then((res) => {
        setPhoto(res.data);
        return axios.get(`http://localhost:2000/getjobinfo/${id}`);
      })
      .then((res) => {
        setApplyData(res.data);
        return axios.get('http://localhost:2000/getinfoemp',{params:{username,password}});
      })
      .then((res)=>{
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

const [sel,setSelect]=useState('')

  const handleSelect=(e)=>{
    setSelect(e.target.value)
  }


  useEffect(()=>{
    if (sel !== '') {
      axios.get('http://localhost:2000/sortby',{params:{sel}})
      .then((res) => {
        setData([]);
        return res.data
        
      })
      .then(res=>{
        setData(res)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },[sel])

  return (
    <>
     <select onChange={handleSelect} className='form-select w-25 border border-primary' name="" id="">
            <option>---sort by---</option>
            <option value="jobtitle">Title</option>
            <option value="category">Category</option>
            <option value="salary">Salary</option>
          </select>
      {data.length === 0 ? (
        <center>
          <b className='m-4'>No jobs requirement is there! if you want employee then you can create job vacancy and can find a right employee for your organisation.</b>
        </center>
      ) : (


        

        <div className='row'>
         
          
          {data.map((ele, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
              <div className="job-card">
                <div className="image-container"></div>
                <div className="details">
                  <h2 className="company-name">Company Name : {ele.companyname}</h2>
                  <b>created by <b className='text-primary'>{ele.username}</b> {
                    (localStorage.getItem('name') === ele.username && localStorage.getItem('password') === ele.password) ?
                      <i className='bg-warning px-4'>YOU</i> :
                      <div></div>
                  }</b>
                  <br />
                  <b> Title:<span className='text-secondary'> {ele.jobtitle}</span></b>
                  <br /><br />
                  <b>Job Type:<span className='text-secondary'> {ele.type}</span></b>
                  <br /><br />
                  <b>Job Category:<span className='text-secondary'> {ele.category}</span></b>
                  <br /><br />
                  <b>Job Location:<span className='text-secondary'> {ele.joblocation}</span></b>
                  <br /><br />
                  <b>Education Requirement:<span className='text-secondary'> {ele.education}</span></b>
                  <br /><br />
                  <b>Job Description:<span className='text-secondary'> {ele.jobdesc}</span></b>
                  <br /><br />
                  <b>Skills required:<span className='text-secondary'> {ele.skills}</span></b>
                  <br /><br />
                  <b>Benefits:<span className='text-secondary'> {ele.benefits}</span></b>
                  <br /><br />
                  <b>Deadline:<span className='text-secondary'> upto {formatDate(ele.deadline)}</span></b>
                  <br /><br />
                  <b>Salary:<span className='text-secondary'> {ele.salary}</span></b>
                  <br /><br />
                  <b>contact information</b>
                  <br />
                  <b>Email:<span className='text-primary'> {ele.email}</span></b>
                  <br />
                  <b>Contact Number:<span className='text-primary'> {ele.phone}</span></b>
                  <br /><br />

                  {
                    (localStorage.getItem('name') === ele.username && localStorage.getItem('password') === ele.password) ?
                      <></> :
                      <button onClick={() => handleApply(ele.id)} className="apply-button">Apply Now</button>
                  }

                  {
                    (localStorage.getItem('name') === ele.username && localStorage.getItem('password') === ele.password) ?
                      <a onClick={() => handleDelete(ele.id)} className="apply-button1">Delete vacancy</a> :
                      <div></div>
                  }

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Available;
