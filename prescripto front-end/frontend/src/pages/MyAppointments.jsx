import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const MyAppointments = () => {
  const [appointmentList, setAppointmentList] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("paymentStatus") === "success") {
      setPaymentSuccess(true);
    }
  }, []);

  // Retrieve credentials from sessionStorage
  const userId = parseInt(sessionStorage.getItem("userId"), 10);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/appointments/getall/user/${userId}`, {
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
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!confirmDelete) return;

    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/appointments/delete/user/${userId}/appointment/${appointmentId}`,
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

  const stripePromise = loadStripe(
   `${import.meta.env.STRIPE_PUBLIC_KEY}`
  ); // PUBLIC key

  const handleCheckout = async (appointmentId) => {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1RNWQCH2oVjw2emObKGFcawo", // Your price ID from Stripe dashboard
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: `http://localhost:5173/${appointmentId}success/`, // after payment
      cancelUrl: "http://localhost:5173/cancel", // if user cancels
    });

    if (error) {
      console.error(error);
    }
  };

  return (
  <div>
    <p className="pb-5 ml-2 sm:mt-12 font-medium text-xl text-zinc-700">
      My Appointments
    </p>
    <div>
      {appointmentList.map((item, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row sm:gap-6 gap-4 py-3 px-3 border-2 rounded-lg border-gray-300 mb-4 mx-2"
        >
          {/* Doctor Image */}
          <div className="flex justify-center sm:block">
            <img
              className="w-32 h-40 rounded-md bg-indigo-50 object-cover"
              src={item.doctor.imageurl}
              alt="Doctor"
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1 text-zinc-600">
            <p className="text-neutral-800 font-semibold">{item.doctor.name}</p>
            <p>{item.doctor.speciality}</p>
            <p className="text-zinc-700 font-medium mt-1">
              Address: {item.doctor.address}
            </p>
            <p className="text-xm mt-1">
              <span className="text-sm text-neutral-700">Date & Time: </span>
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
            <p className="text-sm mt-1">Fees: ${item.doctor.fees}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 justify-end w-full sm:w-auto">
            {item.status === true ? (
              <button
                disabled
                className="text-sm text-green-700 text-center py-2 sm:px-5 border border-green-500 rounded bg-green-200 cursor-not-allowed"
              >
                Consultation Successful
              </button>
            ) : (
              <>
                <button
                  onClick={() =>
                    window.open(
                      `http://localhost:5174/video-call/room/${item.roomId}`,
                      "_blank"
                    )
                  }
                  disabled={!item.roomId}
                  className={`text-sm text-stone-500 font-semibold text-center py-2 sm:px-5 border border-gray-400 rounded hover:bg-primary hover:text-white transition-all duration-300 ${
                    !item.roomId ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Connect With Doctor
                </button>

                <button
                  onClick={()=>handleCheckout(item.appointmentId)}
                  disabled={paymentSuccess}
                  className={`text-sm text-stone-500 font-semibold border border-gray-400 hover:bg-primary hover:text-white px-4 py-2 sm:px-5 rounded transition-all duration-300 ${
                    paymentSuccess
                      ? "text-green-600 border-green-500 bg-green-200 hover:bg-green-200 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {paymentSuccess ? "Payment Done" : "Make Payment"}
                </button>

                <button
                  onClick={() => handleCancelAppointment(item.id)}
                  className="text-sm text-stone-500 font-semibold text-center py-2 sm:px-5 border border-gray-400 rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

};

export default MyAppointments;
