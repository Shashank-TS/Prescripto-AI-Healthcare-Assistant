import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";


const Myprofile = () => {

  const [userData, setUserData] = useState(""); 
  const [isEdit, setIsEdit] = useState(false);

  const userId = parseInt(sessionStorage.getItem("userId"), 10);

  useEffect(() => {
    if (!userId) {
      console.error("User ID is not available in sessionStorage");
      return;
    }
    
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}`, {
        withCredentials:true      
      })
      .then((response) => {
        setUserData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  // Handle save to update the user data
  const handleSave = () => {
    if (!userData || !userId) {
      toast.error("User ID not available for updating.");
      return;
    }

    console.log("isEdit:", isEdit);
    console.log("userData.gender:", userData.gender);

    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/api/user/update-user/${userId}`, userData, {
        withCredentials:true
      })
      .then(() => {
        setIsEdit(false); 
        toast.success("User information updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        toast.error("Failed to update user information.");
      });
  };


  if (!userData) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {isEdit?(
        <>
        <p className="font-medium">Image URL</p>
          <input
            className="bg-gray-50 border border-gray-400 py-2 max-w-60 mt-4"
            type="text"
            value={userData.imageurl}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, imageurl: e.target.value }))
            }
          />
          </>
        ) :(<>
             {
            !userData.imageurl
            ?<img className="w-40 h-40 rounded border border-gray-400" src={assets.upload_area} />
            :<img className="w-40 h-40 rounded" src={userData.imageurl} />
          }
           </>
        )}
      
      <div>
        {isEdit ? (
          <input
            className="bg-gray-50 border border-gray-400 text-3xl font-medium max-w-60 mt-4"
            type="text"
            value={userData.user.fullname}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, fullname: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.user.fullname}
          </p>
        )}
      </div>
      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData.user.username}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-50 border border-gray-400 max-w-52"
              type="number"
              value={userData.phone || ""}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <input
              className="bg-gray-50 border border-gray-400"
              type="text"
              value={userData.address || ""}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
            />
          ) : (
            <p className="text-gray-600">{userData.address}</p>
          )}
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
            className="max-w-20 bg-gray-50 border border-gray-400"
            value={userData.gender || ""}
            onChange={(e) => {
              const newGender = e.target.value;
              setUserData((prev) => ({ ...prev, gender: newGender }));
              console.log("Updated gender:", newGender);
            }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          ) : (
            <p className="text-gray-600">{userData.gender}</p>
          )}
          <p className="font-medium">Date of Birth:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-50 border border-gray-400"
              type="date"
              value={userData.dob || ""}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  dob: e.target.value,
                }))
              }
            />
          ) : (
            <p className="text-gray-600">{userData.dob}</p>
          )}
        </div>
      </div>
      <div className="mt-10">
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={handleSave}
          >
            Save Information
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Myprofile;
