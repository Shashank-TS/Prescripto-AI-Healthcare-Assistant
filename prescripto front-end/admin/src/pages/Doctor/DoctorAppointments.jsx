import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DoctorAppointments = () => {
  const navigate = useNavigate();

  const [appointmentList, setAppointmentList] = useState([]);
  const [status, setStatus] = useState(false);

  const handleStatus = (appt_id) => {
    try {
      axios
        .put(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/appointments/setstatus/${appt_id}`,
          {},
          { withCredentials: true }
        )
        .then(setStatus(true))
        .then(console.log("status set"));
    } catch (error) {
      console.error(error);
    }
  };

  const docid = sessionStorage.getItem("doctorId");

  useEffect(() => {
    if (!docid) {
      console.error("Doctor ID is missing in sessionStorage.");
      return;
    }
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/appointments/getall/doctor/${docid}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setAppointmentList(response.data);
        console.log("Appointments fetched:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [docid]);

  function randomID(len) {
    let result = "";
    if (result) return result;
    var chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  const setRoomId = async (id) => {
    const roomId = randomID(5);
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/appointments/${id}/roomid/${roomId}`,
        {}, // empty body
        { withCredentials: true }
      );
      console.log(response.data);
      navigate(`/video-call/${roomId}`);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle appointment cancellation
  const handleCancelAppointment = (appointmentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!confirmDelete) return;

    axios
      .delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/appointments/delete/appointment/${appointmentId}`,
        {
          withCredentials: true,
        }
      )
      .then(() => {
        setAppointmentList(
          appointmentList.filter(
            (appointment) => appointment.id !== appointmentId
          )
        );
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
    <div className="w-full max-w-6xl m-5">
      <p className="md-3 text-lg font font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll mt-4">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_3fr_3fr_3fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Payment</p>
          <p>Fees</p>
          <p>Call</p>
          <p>status</p>
          <p>Action</p>
        </div>
        {appointmentList.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_3fr_3fr_3fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full"
                src={item.userDetails.imageurl}
                alt=""
              />
              <p>{item.user.fullname}</p>
            </div>
            <p className="max-sm:hidden">
              {calculateAge(item.userDetails.dob)}
            </p>
            <p className="text-xm mt-1">
              {new Date(item.appointmentDate)
                .toLocaleString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
                .replace(",", " | ")}
            </p>
            <p className="max-sm:hidden">online</p>
            <p>${item.doctor.fees}</p>
            <button
              onClick={() => setRoomId(item.id)}
              disabled={item.status}
              className={`w-20 p-2 font-semibold rounded-xl text-white ${
                item.status
                  ? "bg-green-500 cursor-not-allowed" // Green color if done
                  : "bg-blue-500 hover:bg-blue-400" // Blue normally
              }`}
            >
              {item.status ? "Done" : "Call"}
            </button>
            <input
              type="checkbox"
              checked={item.status}
              onChange={() => handleStatus(item.id)}
            />
            <img
              onClick={() => handleCancelAppointment(item.id)}
              className="w-10 cursor-pointer"
              src={assets.cancel_icon}
              alt="cancel appointment"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
