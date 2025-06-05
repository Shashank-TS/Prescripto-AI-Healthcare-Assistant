import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';

const AllAppointments = () => {

  const [appointmentList, setAppointmentList] = useState([]);

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/all-appointments`, 
    {
      withCredentials: true,
    })
    .then((response) => {
      setAppointmentList(response.data);
      console.log("Appointments fetched:", response.data);
    })
    .catch((error) => {
      console.error("Error fetching appointments:", error);
    });
  }, []);

  // Function to handle appointment cancellation
  const handleCancelAppointment = (appointmentId) => {
    const confirmDelete = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmDelete) return;

    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/appointments/delete/appointment/${appointmentId}`, {
     withCredentials: true,
    })
    .then(() => {
      setAppointmentList(appointmentList.filter(appointment => appointment.id !== appointmentId));
    })
    .catch((error) => {
      console.error("Error canceling appointment:", error);
      toast.error("Failed to cancel appointment. Please try again.");
    });
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A"; 
  
    const birthDate = new Date(dob); 
    if (isNaN(birthDate.getTime())) return "Invalid Date"; 
  
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
  
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  };
  

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='md-3 text-lg font font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll mt-5'>

      <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
        <p>#</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Doctor</p>
        <p>Fees</p>
        <p>Action</p>
      </div>
      {appointmentList.map((item,index)=>(
        <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
          <p className='max-sm:hidden'>{index+1}</p>
          <div className='flex items-center gap-2'>
            <img className='w-8 h-8 rounded-full' src={item.userDetails.imageurl} alt=''/><p>{item.user.fullname}</p>
          </div>
          <p className='max-sm:hidden'>{calculateAge(item.userDetails.dob)}</p>
          <p className="text-xm mt-1">
                {new Date(item.appointmentDate).toLocaleString('en-GB', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                }).replace(',', ' | ')}
              </p>
          <div className='flex items-center gap-2'>
            <img className='w-8 h-8 rounded-full bg-gray-200' src={item.doctor.imageurl} alt=''/><p>{item.doctor.name}</p>
          </div>
          <p>${item.doctor.fees}</p>
          <img onClick={() => handleCancelAppointment(item.id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt=''/>
        </div>
      ))}

      </div>     
    </div>
  )
}

export default AllAppointments
