import React, {useEffect, useState } from "react";

const CreateJob = () => {


  const [formData,setFormData]=useState({})


  const handleInputChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit=(e) =>{
    e.preventDefault()
    console.log(formData);
  }

  return (
    <div className="rounded bg-secondary border text-white border-primary m-4">
      <div className="p-4">
        <div className="card-header h2 text-center">Create a Job</div>
        <form>
          <div className="row mb-3">
            <div className="col-lg-4 col-md-6">
              <label htmlFor="jobTitle" className="form-label">Job Title</label>
              <input onChange={handleInputChange} type="text" name="jobTitle" className="form-control" id="jobTitle" placeholder="Job Title" />
            </div>
            <div className="col-lg-4 col-md-6">
              <label htmlFor="companyName" className="form-label">Company Name</label>
              <input onChange={handleInputChange}  type="text" name="companyName" className="form-control" id="companyName" placeholder="Company Name" />
            </div>
            <div className="col-lg-4 col-md-6">
              <label htmlFor="jobLocation" className="form-label">Job Location</label>
              <input onChange={handleInputChange}  type="text" name="jobLocation" className="form-control" id="jobLocation" placeholder="Job Location" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-4 col-md-6">
              <label htmlFor="jobType" className="form-label">Select job type</label>
              <select onChange={handleInputChange} name="jobType" id="jobType" className="form-select">
                <option value="">---Select job type---</option>
                <option value="part time">Part Time</option>
                <option value="full time">Full Time</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="col-lg-4 col-md-6">
              <label htmlFor="jobCategory" className="form-label">Select job category</label>
              <select onChange={handleInputChange} name="jobCategory" id="jobCategory" className="form-select">
                <option value="">---Select job category---</option>
                <option value="IT CS">IT and CS</option>
                <option value="marketing">Marketing</option>
                <option value="healthcare">Healthcare</option>
              </select>
            </div>
            <div className="col-lg-4 col-md-6">
              <label htmlFor="jobDescription" className="form-label">Job Description</label>
              <textarea onChange={handleInputChange} name="jobDescription" className="form-control" id="jobDescription" rows="4" placeholder="Job Description"></textarea>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-4 col-md-6">
              <label htmlFor="skillsRequired" className="form-label">Skills Required</label>
              <textarea onChange={handleInputChange} name="skillsRequired" className="form-control" id="skillsRequired" rows="4" placeholder="Skills Required"></textarea>
            </div>
            <div className="col-lg-4 col-md-6">
              <label htmlFor="education" className="form-label">Education Required</label>
              <input onChange={handleInputChange} type="text" name="education" className="form-control" id="education" placeholder="Education Required" />
            </div>
            <div className="col-lg-4 col-md-6">
              <label htmlFor="salary" className="form-label">Salary</label>
              <input onChange={handleInputChange} type="text" name="salary" className="form-control" id="salary" placeholder="Salary" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-4 col-md-6">
              <label htmlFor="benefits" className="form-label">Benefits</label>
              <input onChange={handleInputChange} type="text" name="benefits" className="form-control" id="benefits" placeholder="Benefits" />
            </div>
            <div className="col-lg-4 col-md-6">
              <label htmlFor="deadline" className="form-label">Deadline</label>
              <input onChange={handleInputChange} type="date" name="deadline" className="form-control" id="deadline" />
            </div>
            <div className="col-lg-4 col-md-6">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input onChange={handleInputChange} type="text" name="phoneNumber" className="form-control" id="phoneNumber" placeholder="Enter Phone Number" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-4 col-md-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input onChange={handleInputChange} type="email" name="email" className="form-control" id="email" placeholder="Enter Email" />
            </div>
          </div>

          <div className="text-center">
            <button onClick={handleSubmit} type="submit" className="btn btn-primary">Create job</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
