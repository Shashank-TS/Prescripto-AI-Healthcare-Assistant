import React from "react";
import { useNavigate } from "react-router-dom";

const symptoms = [
  { name: "Headache", link: "/symptom-checker" },
  { name: "Fever", link: "/symptom-checker" },
  { name: "Cough", link: "/symptom-checker" },
  { name: "Stomach Pain", link: "/symptom-checker" },
  { name: "Fatigue", link: "/symptom-checker" },
  { name: "Sore Throat", link: "/symptom-checker" },
  { name: "Chest Pain", link: "/symptom-checker" },
  { name: "Back Pain", link: "/symptom-checker" },
  { name: "Anemia", link: "/symptom-checker" },
  { name: "Pneumonia", link: "/symptom-checker" },
  { name: "Migraine", link: "/symptom-checker" },
  { name: "Allergies", link: "/symptom-checker" },
  { name: "Depression", link: "/symptom-checker" },


];

const SymptomList = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#F5F5F5] shadow rounded-lg px-4 sm:px-6 lg:px-20 py-12 sm:py-20 mb-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-12 text-center">
          Common Symptoms and Diseases You Can Check
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {symptoms.map((symptom, index) => (
            <div
              key={index}
              onClick={() => navigate(symptom.link)}
              className="cursor-pointer bg-white p-2 text-sm sm:text-base sm:p-5 rounded-xl shadow-sm border border-gray-300 hover:bg-[#5f6FFF] hover:text-white transition duration-300 text-center text-gray-800 hover:shadow-md"
            >
              {symptom.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SymptomList;
