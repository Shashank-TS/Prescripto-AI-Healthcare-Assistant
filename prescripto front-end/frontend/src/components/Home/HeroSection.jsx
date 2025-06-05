import React from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

  const navigate=useNavigate();

  return (
    <div className="w-full bg-white px-3 sm:pl-6 lg:pl-8 pb-10 pt-4 sm:py-16">
      <div className="max-w-7x w-full mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left sm:pl-4">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-700 leading-tight mb-2 sm:mb-4">
            Symptom Checker 
          </h1>
          <p className="text-primary font-bold text-xl mb-8 sm:text-4xl">Powered by AI</p>
          <p className="text-gray-600 text-sm sm:text-xl mb-6 sm:mb-8">
            Just 3 simple steps to efficiently understand and manage your health online with Prescripto AI Symptom Checker:
          </p>
          <div className="flex flex-col text-gray-800 text-sm text-center sm:text-lg gap-2 mb-8 sm:text-left">
          <p>&#x2713; Describe your symptoms</p>
          <p>&#x2713; Answer targeted questions</p>
          <p>&#x2713; Receive instant health insights</p>
          </div>
          
          <button onClick={()=>navigate("/symptom-checker")}  className="bg-[#5f6FFF] hover:bg-[#4a5edb] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition w-full sm:w-64 sm:text-lg">
            Start Symptom Check
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center sm:ml-10">
          <img
            src={assets.homeai}
            alt="AI Symptom Checker"
            className="w-full max-w-md h-48 sm:max-w-2xl sm:h-[500px] sm:w-[700px] rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
