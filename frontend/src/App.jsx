import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import 'remixicon/fonts/remixicon.css'
import CaptainLogout from './pages/CaptainLogout'
import UserLogout from './pages/userLogout'
import Home from './pages/Home'
import CaptainHome from './pages/CaptainHome'
import useCaptainStore from './store/captainStore'
import useUserStore from './store/userStore'

const App = () => {
  const userStore = useUserStore()
  const captainStore = useCaptainStore()
  return (
    <div>
      <Toaster/>
      <Routes>
         <Route path='/' element={<Start />} />
         <Route path='/login' element={<UserLogin />} />
         <Route path='/signup' element={<UserSignup />} />
         <Route path='/captain-login' element={<Captainlogin />} />
         <Route path='/captain-signup' element={<CaptainSignup />} />
         <Route path='/captain-logout' element={<CaptainLogout/>} />
         <Route path='/logout' element={<UserLogout/>} />
         <Route path='/home' element={userStore.isAuthorized ? <Home/> : <UserLogin/>} />
         <Route path='/captain-home' element={captainStore.isAuthorized ? <CaptainHome/> : <Captainlogin/>} />
       </Routes>
    </div>
  )
}

export default App