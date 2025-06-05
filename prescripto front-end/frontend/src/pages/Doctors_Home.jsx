import React from 'react'
import Doctor_Header from '../components/Doctor_Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../components/context/AuthContext'

export const doctors = []; // Acts as a global cache

const Doctors_Home = () => {

  const {isAuthenticated}=useAuth()
  
  const [doctorsList, setDoctorsList] = useState(doctors.length > 0 ? doctors : null); // Check if doctors array already has data

  useEffect(() => {

    // Fetch data only if the global `doctors` array is empty
    if (doctors.length === 0) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/doctors/getalldoctors`,)
        .then((response) => {
          setDoctorsList(response.data); // Store data in local state
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
    <div>
      <Doctor_Header />
      <SpecialityMenu />
      <TopDoctors doctors={doctorsList} /> {/* Pass the doctorsList as props */}
      {
        isAuthenticated
        ? <></>
        : <Banner />
      }
    </div>
  );
};

export default Doctors_Home;
