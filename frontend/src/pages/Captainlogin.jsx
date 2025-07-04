import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useCaptainStore from '../store/captainStore'
import toast from 'react-hot-toast'
import { useEffect } from 'react';

const Captainlogin = () => {
  const navigate = useNavigate()
  const store = useCaptainStore()

  const submitHandler = async (e) => {
    e.preventDefault()
    const response = await store.login()
    
    if (response.success) navigate('/captain-home');
    else {
      toast.error(response.error || 'something went wrong')
    }
    
  }

  useEffect(() => {
    store.resetStore
 }, [store.error])

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
      <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

      <form onSubmit={(e) => {
        submitHandler(e)
      }}>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input
          required
          value={store.email}
          onChange={(e) => {
            store.setEmail(e.target.value)
          }}
          className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
          type="email"
          placeholder='email@example.com'
        />

        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

        <input
          className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
          value={store.password}
          onChange={(e) => {
            store.setPassword(e.target.value)
          }}
          required type="password"
          placeholder='password'
        />
        <button
          className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Login</button>

      </form>
      <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
    </div>
    <div>
      <Link
        to='/login'
        className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
      >Sign in as User</Link>
    </div>
  </div>
  )
}

export default Captainlogin