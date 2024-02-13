import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../css/Available.css';

function Available() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:2000/getjobs')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    // Options for formatting the date
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    };

    // Convert to desired format
    return date.toLocaleDateString('en-US', options);
  };



  return (
    <div className='row'>
      {data.map((ele) => (
        <div className="col-lg-4 col-md-6 col-sm-12" key={ele.jobid}>
          <div className="job-card">
            <div className="image-container">
              <img src="https://via.placeholder.com/150" alt="Company Logo" />
            </div>
            <div className="details">
              <h2 className="company-name">Company Name : {ele.companyname}</h2>
              <b> Title:<span className='text-secondary'> {ele.jobtitle}</span></b>
              <br />
              <br />
              <b>Job Type:<span className='text-secondary'> {ele.type}</span></b>
              <br />
              <br />
              <b>Job Category:<span className='text-secondary'> {ele.category}</span></b>
              <br />
              <br />
              <b>Job Location:<span className='text-secondary'> {ele.joblocation}</span></b>
              <br />
              <br />
              <b>Education Requirement:<span className='text-secondary'> {ele.education}</span></b>
              <br />
              <br />
              <b>Job Description:<span className='text-secondary'> {ele.jobdesc}</span></b>
              <br />
              <br />
              <b>Skills required:<span className='text-secondary'> {ele.skills}</span></b>
              <br />
              <br />
              <b>Benefits:<span className='text-secondary'> {ele.benefits}</span></b>
              <br />
              <br />
              <b>Deadline:<span className='text-secondary'> upto {formatDate(ele.deadline)}</span></b>
              <br />
              <br />
              <b>Salary:<span className='text-secondary'> {ele.salary}</span></b>
              <br />
              <br />
              <b>contact information</b>
              <br />
              <b>Email:<span className='text-primary'> {ele.email}</span></b>
              <br />
              <b>Contact Number:<span className='text-primary'> {ele.phone}</span></b>
              <br />
              <br />
              <a href="#" className="apply-button">Apply Now</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Available;
