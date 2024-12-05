import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import useCaptainStore from '../store/captainStore'
import toast from 'react-hot-toast'
const LogoutButton = () => {
  const navigate = useNavigate()
  const store = useCaptainStore()

  const handleLogout = () => {
    const response = store.logout()
    if (response.success) navigate('/captain-login');
    else{
      toast.error(response.error || 'something went wrong')
    }
  }
  
  useEffect(() => {
    resetStore()
 }, [store.error])

  return (
    <button 
      onClick={handleLogout}
      className='bg-red-500 text-white px-4 py-2 rounded'
      disabled = {store.isLoading}
    >
      {!store.isLoading ? 'Logout' : 'Logging out...'}
    </button>
  )
}

export default LogoutButton