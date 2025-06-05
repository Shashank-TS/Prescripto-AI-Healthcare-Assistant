import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='font-semibold text-gray-700'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row justify-center gap-10 mb-28 text-sm '>
        <img className='w-full max-w-[360px]' src={assets.contact_image}/>
        <div className='flex flex-col justify-center gap-6 items-start'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>Tel: 080 12345-09876 <br/> Email:Shashank@gmail.com</p>
          <p className='text-gray-500'>560621 Doddakallasandra,<br/> Bangalore</p>
          <p className='font-semibold text-lg text-gray-600'>Careers at PRESCRIPTO</p>
          <p className='text-gray-500'>learn more about our teams and job openings</p>
          <button className='border border-black rounded-full px-8 py-4 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer'>Explore jobs</button>
        </div>

      </div>
    </div>
  )
}

export default Contact
