import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();
  const location = useLocation(); // Get previous page
  const [state, setState] = useState("Sign up");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {login} =useAuth();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (state === "Sign up") {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

      const requestData = {
        fullname: name,
        username: email,
        password: password,
        roles:["ROLE_USER"]
      };

      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, requestData);

        if (response.status === 201 || response.status === 200) {
  
          toast.success("Registration successful!");
          setState("Login"); // Switch to login page

        }
        if (response.status === 400){
          toast.warning("Username already exists. Please choose another one.")
        }
      } catch (error) {
        setErrorMessage("Registration failed. Please try again.");
      }
    } else {
      //  Login
      const loginData = {
        username: email,
        password: password
      };

      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, loginData,
        {withCredentials:true});
      
        if (response.status === 200) {
          login() // AuthContext 
          console.log(response)
          const {id} = response.data;
          toast.success("Login Successful!");

          sessionStorage.setItem("userId", id.toString());          

          // Retrieve id from sessionStorage
          const userId = parseInt(sessionStorage.getItem("userId"), 10);

          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getimageurl/${userId}`, {
            withCredentials:true
          })
          .then((response) => {
            console.log(response.data)
            sessionStorage.setItem("imageURL",response.data.imageURL);
          })
          .catch((error) => {
            console.error("Error fetching user profile pic:", error);
          });
          navigate("/");
        }

      } catch (error) {
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
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-52 sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-md">
          <p className="text-2xl font-semibold">{state === "Sign up" ? "Create Account" : "Login"}</p>
          <p>Please {state === "Sign up" ? "Sign up" : "Log in"} to book an appointment</p>

          {state === "Sign up" && (
            <div className="w-full">
              <p>Full Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-zinc-300 rounded w-full p-2 mt-1"
              />
            </div>
          )}

          <div className="w-full">
            <p>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-zinc-300 rounded w-full p-2 mt-1"
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-zinc-300 rounded w-full p-2 mt-1"
            />
          </div>

          {state === "Sign up" && (
            <div className="w-full">
              <p>Confirm Password</p>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border border-zinc-300 rounded w-full p-2 mt-1"
              />
            </div>
          )}

          {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}

          <button className="bg-primary rounded-md text-white w-full py-2 text-base">
            {state === "Sign up" ? "Create Account" : "Login"}
          </button>

          {state === "Sign up" ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => setState("Login")} className="text-primary underline cursor-pointer">
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?{" "}
              <span onClick={() => setState("Sign up")} className="text-primary underline cursor-pointer">
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
