import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext';

const Navbar = () => {

    const navigate=useNavigate();

    const [showmenu,setshowmenu] = useState(false)

    const {isAuthenticated, logout}=useAuth()

    const imageURL = sessionStorage.getItem("imageURL");

    const logoutUser =()=>{
      sessionStorage.clear()
      logout()
      navigate("/")
    }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-500'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt='' className='w-44 cursor-pointer' ></img>
      <ul className='hidden md:flex items-start gap-20 font-medium'>
        <NavLink to='/'>
            <li className='py-1'>HOME</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/symptom-checker'>
            <li className='py-1'>SYMPTOM CHECKER</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/doctor_home'>
            <li className='py-1'>ALL DOCTORS</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/about'>
            <li className='py-1'>ABOUT</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/contact'>
            <li className='py-1'>CONTACT</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {
            isAuthenticated
            ?<div className='flex items-center gap-2 cursor-pointer group relative'>
                {!imageURL ? <img src={assets.upload_area} alt='' className='w-9 h-9 rounded-full'></img> : <img src={imageURL} alt='' className='w-9 h-9 rounded-full'></img>}
              
                <img src={assets.dropdown_icon} alt='' className='w-2.5'/>
                
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                        <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                        <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                        <p onClick={logoutUser} className='hover:text-black cursor-pointer'>Log out</p>
                    </div>
                </div>

            </div>
            :<button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full hover:ring-1 hover:outline-none hover:ring-blue-500  font-light hidden md:block'>Create account</button>
        }
        <img onClick={()=>setshowmenu(true)} className='w-6 md:hidden' src={assets.menu_icon}/> 

        {/* -------mobile menu-------- */}

        <div className={` ${showmenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo}/>
            <img className='w-7' onClick={()=>setshowmenu(false)} src={assets.cross_icon}/>
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink  onClick={()=>setshowmenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
            <NavLink onClick={()=>setshowmenu(false)} to='/symptom-checker'><p className='px-4 py-2 rounded inline-block'>SYMPTOM CHECKER</p></NavLink>
            <NavLink  onClick={()=>setshowmenu(false)} to='/doctor_home'><p className='px-4 py-2 rounded inline-block'>DOCTORS</p></NavLink>
            <NavLink  onClick={()=>setshowmenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
            <NavLink  onClick={()=>setshowmenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
