import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

  const [state, setState] = useState("Admin");
  sessionStorage.setItem("Loginstate",state)

  const navigate=useNavigate();

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [errorMessage, setErrorMessage] = useState("");

  const {login} =useAuth();
  
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");
  
    const loginData = {
      username: email,
      password: password,
    };
  
    console.log("Submitting login data:", loginData); 
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
  
      console.log("Login successful! Response:", response);
  
      if (response.status === 200) {
        login(); // Call AuthContext login
        toast.success("Login successful!");
  
        const { id } = response.data;
        sessionStorage.setItem("doctorId",id.toString());

        setEmail("")
        setPassword("")
        {
          state === 'Admin'
          ? navigate("/admin-dashboard")
          : navigate("/doctor-dashboard")
        }
      }
    } catch (error) {
      console.error("Login error:", error); 
  
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("Invalid username or password");
        } else if (error.response.status === 404) {
          setErrorMessage("User does not exist");
        } else {
          setErrorMessage("An unknown error occurred. Please try again.");
        }
      } else {
        setErrorMessage("Network error. Please check your connection.");
      }
    }
  };

  return(
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-none rounded-xl text-[#5E5E5E] text-sm shadow-lg">
            <p className="text-2xl font-semibold m-auto"><span className="text-[#5F6FFF]">{state}</span> Login</p>
            <div className="w-full">
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="text" required></input>
            </div>
            <div className="w-full">
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password}  className="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" required></input>
            </div>
            <p className="text-red-500">{errorMessage}</p>
            <button type="submit" className="bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base">Login</button>
            {
                state === 'Admin'
                ? <p>Doctor Login? <span className="text-[#5F6FFF] underline cursor-pointer" onClick={()=>setState('Doctor')}>Click here</span></p>
                :<p>Admin Login? <span className="text-[#5F6FFF] underline cursor-pointer" onClick={()=>setState('Admin')}>Click here</span></p>
            }
        </div>
    </form>
    ) ;
};

export default Login;
