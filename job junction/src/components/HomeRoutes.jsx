import React from 'react'
import { Routes, Route } from "react-router-dom";
import CreateJob from './HomeComponents/CreateJob';
import Available from './HomeComponents/Available';
import Articles from './HomeComponents/Articles';
import Animation from './HomeComponents/Animation';
import CreateArticles from './HomeComponents/CreateArticles';
import ResumeBuilder from './HomeComponents/ResumeBuilder';
import YourResume from './HomeComponents/YourResume';
function HomeRoutes() {
  return (
    
    <>
    <Routes>
        <Route path='createjob' element={<CreateJob></CreateJob>}></Route>
        <Route path='available' element={<Available></Available>}></Route>
        <Route path='articles' element={<Articles></Articles>}></Route>
        <Route path='createarticle' element={<CreateArticles></CreateArticles>}></Route>
        <Route path='resume' element={<ResumeBuilder></ResumeBuilder>}></Route>
        <Route path='_resume' element={<YourResume></YourResume>}></Route>
        {/* <Route path='' element={<Animation></Animation>}></Route> */}
    </Routes>
    </>
  )
}

export default HomeRoutes;