import React from 'react'
import { Routes, Route } from "react-router-dom";
import Dashboard from '../Admin/Dashboard';
import Admission from '../Admin/Admission';
import NotFound from "../NotFound";
import ViewStudent from '../Admin/Dashboard/viewStudent';


const Admin = () => {
  return (
    <div>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admission' element={<Admission />} />
        <Route path='/*' element={<NotFound />} />
        <Route path='/dashboard/viewStudent' element={<ViewStudent />} />
      </Routes>
    </div>
  )
}

export default Admin
