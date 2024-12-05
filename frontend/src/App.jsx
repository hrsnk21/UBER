import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import 'remixicon/fonts/remixicon.css'
import CaptainLogout from './pages/CaptainLogout'

const App = () => {

  return (
    <div>
      <Routes>
         <Route path='/' element={<Start />} />
         <Route path='/login' element={<UserLogin />} />
         <Route path='/signup' element={<UserSignup />} />
         <Route path='/captain-login' element={<Captainlogin />} />
         <Route path='/captain-signup' element={<CaptainSignup />} />
         <Route path='/captain-logout' element={<CaptainLogout/>} />
         <Route path='/logout' element={<CaptainSignup />} />
       </Routes>
    </div>
  )
}

export default App