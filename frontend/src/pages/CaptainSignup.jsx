import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useCaptainStore from '../store/captainStore'
import toast from 'react-hot-toast'
import { useEffect } from 'react';

const CaptainSignup = () => {
  const navigate = useNavigate()
  const store = useCaptainStore()

  const submitHandler = async (e) => {
    e.preventDefault()
    const response = await store.signup()
    
      if (response.success) navigate('/captain-home');
      else
      {
        toast.error(response.error || 'something went wrong')
      } 
    
  }
  useEffect(() => {
    resetStore()
  }, [store.error])
  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
    <div>
      <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

      <form onSubmit={(e) => {
        submitHandler(e)
      }}>

        <h3 className='text-lg w-full  font-medium mb-2'>What's our Captain's name</h3>
        <div className='flex gap-4 mb-7'>
          <input
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
            type="text"
            placeholder='First name'
            value={store.firstName}
            onChange={(e) => {
              store.setFirstName(e.target.value)
            }}
          />
          <input
            required
            className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
            type="text"
            placeholder='Last name'
            value={store.lastName}
            onChange={(e) => {
              store.setLastName(e.target.value)
            }}
          />
        </div>

        <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
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

        <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
        <div className='flex gap-4 mb-7'>
          <input
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
            type="text"
            placeholder='Vehicle Color'
            value={store.vehicleColor}
            onChange={(e) => {
              store.setVehicleColor(e.target.value)
            }}
          />
          <input
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
            type="text"
            placeholder='Vehicle Plate'
            value={store.vehiclePlate}
            onChange={(e) => {
              store.setVehiclePlate(e.target.value)
            }}
          />
        </div>
        <div className='flex gap-4 mb-7'>
          <input
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
            type="number"
            placeholder='Vehicle Capacity'
            value={store.vehicleCapacity}
            onChange={(e) => {
              store.setVehicleCapacity(e.target.value)
            }}
          />
          <select
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
            value={store.vehicleType}
            onChange={(e) => {
              store.setVehicleType(e.target.value)
            }}
          >
            <option value="" disabled>Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
            <option value="moto">Moto</option>
          </select>
        </div>

        <button disabled={store.isLoading}
          className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >{!store.isLoading ? 'Create Captain Account' : 'Creating....'}</button>

      </form>
      <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
    </div>
    <div>
      <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
        Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
    </div>
  </div>
  )
}

export default CaptainSignup