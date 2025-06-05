import React from 'react'
import { assets } from '../assets/assets'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {

  const {logout} =useAuth()

  const logoutHandler =()=>{
    sessionStorage.clear()
    logout()
  }
    
  return (
    <>
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-none border-[#dadada] bg-white'>
        <div>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt=""/>     
        </div>
        <button onClick={logoutHandler} className='bg-[#5F6FFF] text-white text-sm px-10 py-2 rounded-full'>Logout</button>      
    </div>
    <hr className='text-gray-300'></hr>
    </>
  )
}

export default Navbar
