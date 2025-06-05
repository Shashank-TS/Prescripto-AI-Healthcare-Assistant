import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const PaymentSuccess = () => {

  const appointmentId=useParams("appointmentId")

    useEffect(() => {
        // Payment succeeded
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/setpaymentstatus/${appointmentId}`,{})
        localStorage.setItem('paymentStatus', 'success');
      }, []);
    

    const navigate=useNavigate()
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <h1 className="text-3xl font-bold text-green-500 mb-8">Payment Successful!</h1>
        <button onClick={()=>navigate('/my-appointments')} className="text-sm text-white text-center sm:min-w-48 py-2 border border-blue-500 rounded bg-primary ">Back to Appointments</button>
        
      </div>
    );
  };
  
  export default PaymentSuccess;
  