import React from "react";
import { FaUserMd, FaClipboardCheck, FaLightbulb } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaClipboardCheck className="text-3xl text-[#5f6FFF]" />,
      title: "Enter Your Symptoms",
      description: "Begin by entering your single or multiple symptoms into the checker. Our AI is able to understand a wide range of health indicators.",
    },
    {
      icon: <FaUserMd className="text-3xl text-[#5f6FFF]" />,
      title: "Answer Follow-Up Questions",
      description: "The Symptom Checker may ask follow-up questions to better identify potential conditions, targeting specific health concerns.",
    },
    {
      icon: <FaLightbulb className="text-3xl text-[#5f6FFF]" />,
      title: "Receive Your Results",
      description: "Our AI analyzes your symptoms and instantly provides you with a comprehensive list of potential health conditions and insights.",
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-20 py-8 sm:py-10 mb-14">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-10 sm:mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:scale-105 hover:text-white duration-300 transition-all"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-5 text-gray-800 ">{step.title}</h3>
              <p className="text-gray-600 text-sm sm:text-lg ">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;
