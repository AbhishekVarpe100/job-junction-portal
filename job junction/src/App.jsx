import { useState } from 'react'
import SignUpForm from './components/SignUpForm';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProfileCard from './components/ProfileCard';
import CreateProfile from './components/CreateProfile';
import Photo from './components/Photo';
import EditPhoto from './components/EditPhoto';
import EditInfo from './components/EditInfo';
import HomeRoutes from './components/HomeRoutes';


import Animation from './components/HomeComponents/Animation';
import Applicants from './components/Applicants';
import AppliedJobs from './components/AppliedJobs';
// import Articles from './components/HomeComponents/Articles';
// import CreateJob from './components/HomeComponents/CreateJob';
// import Available from './components/HomeComponents/Available';

function App() {
  
  const handleChildData = (name,password) => {
    // setName(name);
    // setPassword(password);
  };

  return (
    <>
    <div className='container'>
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path='/signup' element={<SignUpForm></SignUpForm>}></Route>
        <Route path='/' element={<Login onChildData={handleChildData}></Login>}></Route>

        <Route path='/applicants' element={<Applicants></Applicants>}></Route>
        <Route path='/applied' element={<AppliedJobs></AppliedJobs>}></Route>

        {/* nested routes */}
        <Route path='/home' element={<Home></Home>}>
        <Route path='/home/*' element={<HomeRoutes></HomeRoutes>} />
        <Route path='' element={<Animation></Animation>}></Route>

        {/* <Route path='' element={<Animation></Animation>}></Route> */}

        {/* <Route path='createjob' element={<CreateJob></CreateJob>}></Route>
        <Route path='available' element={<Available></Available>}></Route>
        <Route path='articles' element={<Articles></Articles>}></Route> */}
        </Route>



        <Route path='/logout' element={<Login></Login>}></Route>
        <Route path='/profile' element={<ProfileCard></ProfileCard>}></Route>
        <Route path='/create' element={<CreateProfile></CreateProfile>}></Route>
        <Route path='/upload' element={<Photo></Photo>}></Route>
        <Route path='/editphoto' element={<EditPhoto></EditPhoto>}></Route>
        <Route path='/editinfo/:id' element={<EditInfo></EditInfo>}></Route>
      </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
