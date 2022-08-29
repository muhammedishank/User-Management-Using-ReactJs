import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Secret from './Pages/Secret'
import Signup from './Pages/Signup'
import AdmLogin from './Pages/AdmLogin'
import "react-toastify/dist/ReactToastify.css"
import AdmHome from './Pages/AdmHome'
import EditUser from './Pages/EditUser'
import Context from './Pages/store/Context'

function App() {
  return (
    <BrowserRouter>
      <Context>
        <Routes>
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/' element={<Secret />} />
          <Route exact path='/admin' element={<AdmLogin />} />
          <Route exact path='/AdminHome' element={<AdmHome />} />
          <Route exact path='/EditUser' element={<EditUser />} />
        </Routes>
      </Context>

    </BrowserRouter>
  )
}

export default App