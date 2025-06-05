import React from 'react'
import {SpecialityData} from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-800'>

      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='w-1/3 text-center sm:text-base text-sm'>Simply Browse through our extensive list of trusted doctors, schedule your appointment</p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
        {SpecialityData.map((item,index)=>(
            <Link  key={index} to={`all_doctors/${item.speciality}`}  className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'>
                <img src={item.image} className='w-16 sm:w-24 mb-2'/>
                <p className='text-xs sm:text-sm'>{item.speciality}</p>
            </Link>
        ))}
      </div>
      
    </div>
  )
}

export default SpecialityMenu

