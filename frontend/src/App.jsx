import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
        <Toaster/>
        <Routes>
           <Route path='/' element={ <Start/>} />
           <Route path='/login' element={<UserLogin />} />
           <Route path='/signup' element={<UserSignup />} />
           <Route path='/captain-login' element={<Captainlogin />} />
           <Route path='/captain-signup' element={<CaptainSignup />} />
           <Route path='/home'
              element={
                     <UserProtectWrapper>
                          <Home />
                     </UserProtectWrapper>
                     } />
           <Route path='/user/logout'
              element={<UserProtectWrapper>
                          <UserLogout />
                       </UserProtectWrapper>
                     } />
           <Route path='/captain-home'
              element={<CaptainProtectWrapper>
                          <CaptainHome />
                       </CaptainProtectWrapper>
                     } />
           <Route path='/captain/logout' 
              element={<CaptainProtectWrapper>
                         <CaptainLogout />
                      </CaptainProtectWrapper>
                    } />
        </Routes>
    </div>
  )
}

export default App