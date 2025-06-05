import React from 'react'
import { assets } from '../assets/assets'

const Doctor_Header = () => {

  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-[#F5F5F5] rounded-lg px-6 md:px-10 lg:px-20'>

      {/* ---------left side-------- */}

      <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 pb-10 pt-6 m-auto md:py-[8vw] md:mb-[-30px]'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-gray-700 text-center sm:text-left font-bold leading-tight md:leading-tight lg:leading-tight '>Book Appointment With Trusted Doctors</p>
        <div className='flex flex-col md:flex-row items-center gap-3 sm:mb-4'>
            <img src={assets.group_profiles} alt='' className='w-28'/>
            <p className='text-sm sm:text-base text-gray-700' >Simply browse through our extensive list of trusted doctors,<br className='hidden sm:block'/>
                schedule your appointments hassle-free</p>
        </div>
            <a href='#speciality' className='flex items-center gap-2 bg-primary px-8 py-3 sm:px-12 sm:py-3 sm:text-base rounded-full text-white font-medium text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                Book appointment 
                
            </a>
      </div>

      {/* -------right side--------- */}
      <div className='md:w-1/2 relative'>
        <img src={assets.header_img} className='w-full md:absolute bottom-0 h-auto rounded-lg'/>
      </div>

    </div>
  )
}

export default Doctor_Header
