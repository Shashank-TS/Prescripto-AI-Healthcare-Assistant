import React from 'react'
import { assets } from '../../assets/assets'
import { useState,useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {

  const [counts, setCounts] = useState({ totalDoctors: 0, totalAppointments: 0, totalPatients: 0 });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard/counts`,{
      withCredentials: true
    })
      .then(response => {
        setCounts(response.data);
      })
      .catch(error => {
        console.error("Error fetching dashboard counts:", error);
      });
  }, []);

  return (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt=''/>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{counts.totalDoctors}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt=''/>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{counts.totalAppointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt=''/>
          <div>
            <p className='text-xl font-semibold text-gray-600'> {counts.totalPatients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default Dashboard
