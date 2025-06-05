import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [education, setEducation] = useState("");
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const randomId=`${Math.floor(Math.random() * 1000000)}`

    const authData = {
      fullname: name,
      username: email,
      password: password,
      roles:["ROLE_DOCTOR"],
    };

    try {
      // First API Call: Send email and password for authentication
      const authResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, authData);

      if (authResponse.status === 400){
        toast.warning("User with email already exists. Please choose another one.")
      }
      
      if (authResponse.status === 201 || authResponse.status === 200) {
        console.log("Authentication created successfully:", authResponse.data);

        const doctorData ={
          _id:authResponse.data,
          name:name,
          speciality:speciality,
          degree: education, 
          experience:experience,
          about:about,
          fees: parseFloat(fees), 
          address:address,
          phone: parseInt(phone, 10),
          imageurl: image,
          city:city,
        }

        // Second API Call: Send doctor details after successful auth
        const doctorResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/doctor/add`,doctorData,{
         withCredentials: true});

        if (doctorResponse.status === 201 || doctorResponse.status === 200) {
          toast.success("Doctor added successfully!");
          console.log("Doctor added:", doctorResponse.data);
          // Reset form fields
          setImage("");
          setName("");
          setEmail("");
          setPassword("");
          setExperience("1 year");
          setFees("");
          setSpeciality("General physician");
          setEducation("");
          setAddress("");
          setAbout("");
          setPhone("");
          setCity("Bangalore");
        }
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      toast.error("Failed to add doctor. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll border-none">
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Image URL</p>
              <input
                onChange={(e) => setImage(e.target.value)}
                value={image}
                className="border rounded px-3 py-2 border-gray-400"
                type="text"
                placeholder="Please add image URL"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2 border-gray-400"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2 border-gray-400"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2 border-gray-400"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-2 border-gray-400"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`${i + 1} year`}>
                    {i + 1} year
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded px-3 py-2 border-gray-400"
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-3 py-2 border-gray-400"
              >
                {[
                  "General physician",
                  "Gynecologist",
                  "Dermatologist",
                  "Pediatrician",
                  "Neurologist",
                  "Gastroenterologist",
                ].map((spec, index) => (
                  <option key={index} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                onChange={(e) => setEducation(e.target.value)}
                value={education}
                className="border rounded px-3 py-2 border-gray-400"
                type="text"
                placeholder="Education"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>City</p>
              <select
                onChange={(e) => setCity(e.target.value)}
                value={city}
                className="border rounded px-3 py-2 border-gray-400"
              >
                {[
                  "Bangalore",
                  "Mysore",
                  "Ramanagara",
                ].map((cit, index) => (
                  <option key={index} value={cit}>
                    {cit}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className="border rounded px-3 py-2 border-gray-400"
                type="text"
                placeholder="Address"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Phone</p>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="border rounded px-3 py-2 border-gray-400"
                type="tel"
                placeholder="Phone Number"
                required
              />
            </div>
          </div>
        </div>

        <div className="text-gray-600">
          <p className="mt-4 mb-2">About</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border rounded border-gray-400"
            placeholder="Write about doctor"
            rows={5}
          />
        </div>

        <button type="submit" className="bg-[#5F6FFF] text-white px-10 py-3 mt-4 rounded-full">
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;

// Dr. Sandeep is a dedicated and highly skilled General Physician with over 2 years of experience in providing exceptional patient care