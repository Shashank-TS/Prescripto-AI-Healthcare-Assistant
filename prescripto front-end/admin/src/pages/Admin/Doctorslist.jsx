import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';

const doctors=[]

const Doctorslist = () => {

  const [doctorsList, setDoctorsList] = useState(doctors.length > 0 ? doctors : null); // Check if doctors array already has data

  useEffect(() => {
    // Fetch data only if the global `doctors` array is empty
    if (doctors.length === 0) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/getalldoctors`, {
        withCredentials: true,
      })
        .then((response) => {
          setDoctorsList(response.data); 
          doctors.push(...response.data); // Update global cache
          console.log("Doctors fetched:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching doctors:", error);
        });
    } else {
      console.log("Using cached doctors:", doctors);
    }
  }, []);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item,index)=>(
            <div className='border border-indigo-200  rounded-xl max-w-52 overflow-hidden cursor-pointer group' key={index} >
              
              <img className='h-60 w-52 bg-indigo-50 group-hover:bg-[#5F6FFF] transition-all duration-500' src={item.imageurl} alt=''/> 
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'><span>Dr. </span>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality} <span>- {item.degree}</span></p>
              </div>
            </div>

          ))
        }
      </div>      
    </div>
  )
}

export default Doctorslist
