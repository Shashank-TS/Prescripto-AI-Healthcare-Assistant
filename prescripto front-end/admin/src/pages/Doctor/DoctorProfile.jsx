import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    speciality: "",
    degree: "",
    experience: "",
    about: "",
    fees: "",
    address: "",
    imageurl: ""
  });

  // Retrieve docId from sessionStorage  
  const docid = sessionStorage.getItem("doctorId");

  // Fetch doctor data by ID
  useEffect(() => {
    
    if (!docid) {
      console.error("Doctor ID is missing in sessionStorage.");
      return;
    }

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/getdoctorbyid/${docid}`, {
      withCredentials: true
    })
    .then(response => {
      setProfileData(response.data);
    })
    .catch(error => {
      console.error("Error fetching doctor data:", error);
    });
  }, [docid]);

  // Handle updating doctor details
  const handleUpdate = () => {
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/updatedoctor/${docid}`, profileData, {
      withCredentials: true
    })
    .then(response => {
      setProfileData(response.data);
      setIsEdit(false);
    })
    .catch(error => {
      console.error("Error updating doctor profile:", error);
      toast.error("Failed to update profile. Please try again.");
    });
  };

  return (
    <div>
      <div className='flex flex-col gap-3 m-5'>
        <div>
          <img className='bg-blue-600 w-52 h-62 sm:max-w-64 rounded-lg' src={profileData.imageurl} alt='Doctor' />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/* ---- Doctor info ---- */}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'><span>Dr. </span>
            {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))} value={profileData.name} /> : profileData.name}
          </p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience} years</button>
          </div>

          {/* ---- Doctor about ---- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
              {isEdit ? <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} value={profileData.about} /> : profileData.about}
            </p>
          </div>

          {/* ---- Appointment Fee ---- */}
          <p className='text-gray-600 font-medium mt-4'>
            Appointment fee: <span className='text-gray-800'>$ 
              {isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}
            </span>
          </p>

          {/* ---- Address ---- */}
          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))} value={profileData.address} /> : profileData.address}
            </p>
          </div>

          {/* ---- Availability Checkbox ---- */}
          <div className='flex gap-1 pt-2'>
            <input type="checkbox" />
            <label htmlFor=''>Available</label>
          </div>

          {/* ---- Edit & Save Buttons ---- */}
          {isEdit ? (
            <button onClick={handleUpdate} className='px-4 py-1 border border-blue-500 text-sm rounded-full mt-5 hover:bg-blue-500'>
              Save
            </button>
          ) : (
            <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-blue-500 text-sm rounded-full mt-5 hover:bg-blue-500'>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;

