import React, { useEffect, useState } from "react";

const CreateJob = () => {
  const [formData, setFormData] = useState({
    username: localStorage.getItem('name'),
    password: localStorage.getItem('password'),
    jobTitle: '',
    companyName: '',
    jobLocation: '',
    jobType: '',
    jobCategory: '',
    jobDescription: '',
    skillsRequired: '',
    education: '',
    salary: '',
    benefits: '',
    deadline: '',
    phoneNumber: '',
    email: '',
  });
  const [create, setCreate] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:2000/createjob`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTimeout(() => {
          setCreate(
            <div className="alert alert-danger">
              <b>Job created successfully</b>{" "}
            </div>
          );
          setTimeout(() => {
            setCreate("");
            setFormData({
              ...formData,
              jobTitle: '',
              companyName: '',
              jobLocation: '',
              jobType: '',
              jobCategory: '',
              jobDescription: '',
              skillsRequired: '',
              education: '',
              salary: '',
              benefits: '',
              deadline: '',
              phoneNumber: '',
              email: '',
            });
          }, 3000);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="rounded bg-dark border text-white m-4">
      <div className="p-4">
        {create}
        <div className="card-header h2 text-center">Create a Job</div>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-lg-4 col-md-6">
              <label htmlFor="jobTitle" className="form-label">Job Title</label>
              <input
                value={formData.jobTitle}
                onChange={handleInputChange}
                type="text"
                name="jobTitle"
                className="form-control"
                id="jobTitle"
                placeholder="Job Title"
                required
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <label htmlFor="companyName" className="form-label">Company Name</label>
              <input
                value={formData.companyName}
                onChange={handleInputChange}
                type="text"
                name="companyName"
                className="form-control"
                id="companyName"
                placeholder="Company Name"
                required
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <label htmlFor="jobLocation" className="form-label">Job Location</label>
              <input
                value={formData.jobLocation}
                onChange={handleInputChange}
                type="text"
                name="jobLocation"
                className="form-control"
                id="jobLocation"
                placeholder="Job Location"
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-4 col-md-6">
              <label htmlFor="jobType" className="form-label">Select job type</label>
              <select
                value={formData.jobType}
                onChange={handleInputChange}
                name="jobType"
                id="jobType"
                className="form-select"
                required
              >
                <option value="">---Select job type---</option>
                <option value="part time">Part Time</option>
                <option value="full time">Full Time</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="col-lg-4 col-md-6">
              <label htmlFor="jobCategory" className="form-label">Select job category</label>
              <select
                value={formData.jobCategory}
                onChange={handleInputChange}
                name="jobCategory"
                id="jobCategory"
                className="form-select"
                required
              >
                <option value="">---Select job category---</option>
                <option value="IT CS">IT and CS</option>
                <option value="marketing">Marketing</option>
                <option value="healthcare">Healthcare</option>
              </select>
            </div>
            <div className="col-lg-4 col-md-6">
              <label htmlFor="jobDescription" className="form-label">Job Description</label>
              <textarea
                value={formData.jobDescription}
                onChange={handleInputChange}
                name="jobDescription"
                className="form-control"
                id="jobDescription"
                rows="4"
                placeholder="Job Description"
                required
              ></textarea>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-4 col-md-6">
              <label htmlFor="skillsRequired" className="form-label">Skills Required</label>
              <textarea
                value={formData.skillsRequired}
                onChange={handleInputChange}
                name="skillsRequired"
                className="form-control"
                id="skillsRequired"
                rows="4"
                placeholder="Skills Required"
                required
              ></textarea>
            </div>
            <div className="col-lg-4 col-md-6">
              <label htmlFor="education" className="form-label">Education Required</label>
              <input
                value={formData.education}
                onChange={handleInputChange}
                type="text"
                name="education"
                className="form-control"
                id="education"
                placeholder="Education Required"
                required
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <label htmlFor="salary" className="form-label">Salary</label>
              <input
                value={formData.salary}
                onChange={handleInputChange}
                type="text"
                name="salary"
                className="form-control"
                id="salary"
                placeholder="Salary"
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-4 col-md-6">
              <label htmlFor="benefits" className="form-label">Benefits</label>
              <input
                value={formData.benefits}
                onChange={handleInputChange}
                type="text"
                name="benefits"
                className="form-control"
                id="benefits"
                placeholder="Benefits"
                required
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <label htmlFor="deadline" className="form-label">Deadline</label>
              <input
                value={formData.deadline}
                onChange={handleInputChange}
                type="date"
                name="deadline"
                className="form-control"
                id="deadline"
                required
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                value={formData.phoneNumber}
                onChange={handleInputChange}
                type="text"
                name="phoneNumber"
                className="form-control"
                id="phoneNumber"
                placeholder="Enter Phone Number"
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-4 col-md-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                required
              />
            </div>
          </div>
          <div className="text-center">
            <input className="btn btn-warning w-25" type="submit" value="Create job" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
