import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";

const DoctorDashboard = () => {
  
  const docid = sessionStorage.getItem("doctorId");

  const [counts, setCounts] = useState({ totalAppointments: 0, totalPatients: 0, totalEarnings: 0 });

  useEffect(() => {
    if (!docid) {
      console.error("Doctor ID is missing in sessionStorage.");
      return;
    }
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/dashboard/${docid}`, {
      withCredentials: true,
    })
      .then(response => {
        setCounts(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error("Error fetching doctor dashboard data:", error);
      });
  }, []);

  return (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.earning_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">${counts.totalEarnings}</p>
            <p className="text-gray-400">Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{counts.totalAppointments}</p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{counts.totalPatients}</p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;

