import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './Screens/Auth/Login';
import NotFound from "./Screens/NotFound";
import Admin from "./Screens/Admin";
import { ToastContainer } from "react-toastify";


const App = () => {
  return (
    <div>
    
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<AuthPage />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='/Admin/*' element={<Admin />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position='bottom-left'
        autoClose={10000}
        heightProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={'light'}
      />

    </div>
  )
}

export default App;