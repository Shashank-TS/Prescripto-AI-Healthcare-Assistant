// import React from "react";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";

// const Home_Comp_4 = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center py-10">
//       <div className="flex flex-col md:flex-row items-center bg-gray-100 bg-lue-400 pb-10 sm:p-0 rounded-lg  w-full">
//         <img
//           src={assets.about_image}
//           alt="Brand Creation"
//           className="w-full md:w-1/3 rounded-md mb-4 md:mb-0 md:mr-6"
//         />
//         <div className="text-center md:p-20 p-2">
//           <h2 className="text-3xl text-primary font-bold mb-4">
//             Book Appointment with Our Expert Doctors
//           </h2>
//           <p className="text-gray-500 ">
//             Take control of your health by booking an appointment with our
//             experienced doctors. Whether you need a routine checkup or
//             specialized care, we’re here to assist. Schedule your consultation
//             now for a personalized medical experience.
//           </p>

//           <div className="flex justify-center">
//             <button
//               onClick={() => navigate("/doctor_home")}
//               className="w-50 mt-7 text-white bg-primary hover:scale-105 transition-all duration-300 font-medium rounded-full  px-8 py-3"
//             >
//               Book appointment
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home_Comp_4;
import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Home_Comp_4 = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto bg-gray- rounded-xl overflow-hidden flex flex-col sm:gap-16 md:flex-row items-center shadow-sm">
        {/* Image */}
        <img
          src={assets.about_image}
          alt="Brand Creation"
          className="w-full md:w-[500px] sm:h-[500px] object-cover"
        />

        {/* Text Section */}
        <div className="w-full md:w-1/2 px-6 sm:px-10 py-10 text-center md:text-left">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-700 mb-8">
            Book Appointment with Our Expert Doctors
          </h2>
          <p className="text-gray-600 text-sm sm:text-lg leading-relaxed mb-10">
            Take control of your health by booking an appointment with our
            experienced doctors. Whether you need a routine checkup or
            specialized care, we’re here to assist. Schedule your consultation
            now for a personalized medical experience.
          </p>
          <div className="flex justify-center md:justify-start">
            <button onClick={() => navigate("/doctor_home")} className="bg-[#5f6FFF] hover:bg-[#4a5edb] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition w-full sm:w-64 sm:text-lg ">
            Book Appointment
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_Comp_4;
