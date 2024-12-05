import React from 'react'
import { useNavigate } from 'react-router-dom'
import useCaptainStore from '../store/captainStore'

const LogoutButton = () => {
  const navigate = useNavigate()
  const {logout} = useCaptainStore()

  const handleLogout = () => {
    if(logout())
      navigate('/captain-login')
  }

  return (
    <button 
      onClick={handleLogout}
      className='bg-red-500 text-white px-4 py-2 rounded'
    >
      Logout
    </button>
  )
}

export default LogoutButton