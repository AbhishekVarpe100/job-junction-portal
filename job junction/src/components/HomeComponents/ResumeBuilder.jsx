import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ResumeBuilder = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profile, setProfile] = useState('');
  const [education1, setEducation1] = useState('');
  const [education2, setEducation2] = useState('');
  const [technicalSkills, setTechnicalSkills] = useState('');
  const [softSkills, setSoftSkills] = useState('');
  const [certificates, setCertificates] = useState('');
  const [languages, setLanguages] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstname', firstName);
    formData.append('lastname', lastName);
    formData.append('profile', profile);
    formData.append('education1', education1);
    formData.append('education2', education2);
    formData.append('technicalSkills', technicalSkills);
    formData.append('softSkills', softSkills);
    formData.append('certificates', certificates);
    formData.append('languages', languages);
    formData.append('profilePhoto', profilePhoto);
    formData.append('username', localStorage.getItem('name'));
    formData.append('password', localStorage.getItem('password'));
    formData.append('email', email);
    formData.append('phone', phone);

    axios.post('http://localhost:2000/resumedata',formData)
    .then(res=>{
        if(res){
            alert("Created")
        }
    })
    .catch((err)=>{
        console.log(err)
    })
   
  };

  return (
    <Container className="p-4 m-4" style={{ backgroundColor: '#f2f2f2' }}>
      <small className="text-muted">Fields marked with (*) are compulsory.</small>
      <h1 className="mt-5 mb-4">Resume Builder</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>
                First Name<sup>*</sup>
              </Form.Label>
              <Form.Control required
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>
                Last Name<sup>*</sup>
              </Form.Label>
              <Form.Control required
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>
                Email<sup>*</sup>
              </Form.Label>
              <Form.Control required
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>
                Contact Number<sup>*</sup>
              </Form.Label>
              <Form.Control required
                type='text'
                placeholder="Enter your contact number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="profile">
          <Form.Label>
            Profile<sup>*</sup>
          </Form.Label>
          <Form.Control required
            as="textarea"
            rows={3}
            placeholder="Write a brief profile"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
          />
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group controlId="education1">
              <Form.Label>
                Education 1<sup>*</sup>
              </Form.Label>
              <Form.Control required
                type="text"
                placeholder="Enter your first education"
                value={education1}
                onChange={(e) => setEducation1(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="education2">
              <Form.Label>Education 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your second education"
                value={education2}
                onChange={(e) => setEducation2(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="technicalSkills">
          <Form.Label>
            Technical Skills<sup>*</sup>
          </Form.Label>
          <Form.Control required
            as="textarea"
            rows={3}
            placeholder="Enter your technical skills"
            value={technicalSkills}
            onChange={(e) => setTechnicalSkills(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="softSkills">
          <Form.Label>
            Soft Skills<sup>*</sup>
          </Form.Label>
          <Form.Control required
            as="textarea"
            rows={3}
            placeholder="Enter your soft skills"
            value={softSkills}
            onChange={(e) => setSoftSkills(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="certificates">
          <Form.Label>
            Certificates<sup>*</sup>
          </Form.Label>
          <Form.Control required
            as="textarea"
            rows={3}
            placeholder="Enter your certificates"
            value={certificates}
            onChange={(e) => setCertificates(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="languages">
          <Form.Label>
            Languages<sup>*</sup>
          </Form.Label>
          <Form.Control required
            type="text"
            placeholder="Enter languages you know"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="profilePhoto">
          <Form.Label>Profile Photo <sup>*</sup> </Form.Label>
          <Form.Control required
            type="file"
            onChange={(e) => setProfilePhoto(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ResumeBuilder;
