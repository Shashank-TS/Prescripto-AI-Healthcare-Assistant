import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-32 text-sm'>

        {/* ----left section------ */}
        <div>
            <img className='mb-5 w-40' src={assets.logo}/>
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Prescripto, where cutting-edge technology meets compassionate healthcare. Our mission is to revolutionize the way diseases are predicted and managed, empowering individuals and healthcare professionals with advanced AI-driven tools.</p>
        </div>

        {/* ----center section------ */}
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>AI Assistant</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        {/* ----right section------ */}
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+91 789278****</li>
                <li>shashankts1504@gmail.com</li>
            </ul>
        </div>

      </div>

      <div>
        <hr className='text-gray-600'/>
        <p className='py-5 text-sm text-center'>Copyright@2025 Prescripto - All Right Reserved</p>
      </div>

    </div>
  )
}

export default Footer
