import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './context/AppContext';

const TopDoctors = () => {

  const navigate=useNavigate();
  const {doctors}=useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 sm:my-16 text-gray-800 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm sm:text-base '>Simply Browse through our extensive list of trusted doctors</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {doctors.slice(0,10).map((item,index)=>(
                <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-14px] transition-all duration-500' key={index}>
                  <img className='bg-blue-50 w-full h-72 sm:w-full sm:h-72' src={item.imageurl}/>
                    <div className='p-4'>
                      <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                        <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                      </div>
                        <p>{item.name}</p>
                        <p>{item.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={()=>{navigate('/all_doctors'); scrollTo(0,0)}} className='bg-primary text-white px-12 py-3 rounded-full mt-10 hover:scale-105 transition duration-300'>more</button>
    </div>
    
  )
}

export default TopDoctors
