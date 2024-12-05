import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import toast from 'react-hot-toast'
import { useEffect } from 'react';
const UserLogout = () => {
  const { logout, isLoading, error,resetStore } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout(); 
    if (response.success) navigate('/login');
    else
    {
      toast.error(response.error || 'something went wrong')
    } 
  };

  useEffect(() => {
    resetStore()
 }, [error])

  return (
    <button disabled = {isLoading} className='bg-red-500 text-white px-4 py-2 rounded' onClick={handleLogout}>
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
};

export default UserLogout;
