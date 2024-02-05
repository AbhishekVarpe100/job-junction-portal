import React from 'react'
import { Routes, Route } from "react-router-dom";
import CreateJob from './HomeComponents/CreateJob';
import Available from './HomeComponents/Available';
import Articles from './HomeComponents/Articles';
import Animation from './HomeComponents/Animation';
function HomeRoutes() {
  return (
    
    <>
    <Routes>
        <Route path='createjob' element={<CreateJob></CreateJob>}></Route>
        <Route path='available' element={<Available></Available>}></Route>
        <Route path='articles' element={<Articles></Articles>}></Route>
        {/* <Route path='' element={<Animation></Animation>}></Route> */}
    </Routes>
    </>
  )
}

export default HomeRoutes;