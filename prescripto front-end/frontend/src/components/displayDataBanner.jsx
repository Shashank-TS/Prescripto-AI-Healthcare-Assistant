import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const DisplayDataBanner = () => {
  
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-4 rounded-2xl shadow-md mb-10 mx-4 md:mx-24 mt-6"
      style={{
        background: 'linear-gradient(135deg, #5f6FFF 0%, #8B9AFF 100%)',
      }}
    >
      <div className="max-w-2xl text-center md:text-left mb-8 md:mb-0 p-6 rounded-2xl">
        <h1 className="text-2xl md:text-4xl font-medium text-white mb-4">
          Got Questions About Your Prediction?
        </h1>
        <p className="text-sm md:text-lg text-gray-100 mb-6 font-sans">
          Clarify your doubts instantly with our AI-powered chat assistant. 
          Get detailed explanations, personalized advice, and peace of mind.
        </p>
        <button
          onClick={() => navigate('/ai-chatbot')}
          className="bg-white text-[#5f6FFF] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Try AI Chat Now 
        </button>
      </div>

      {/* Image */}
      <div className="max-w-md md:mt-0">
        <img
          src={assets.ai_chat} 
          alt="AI Chat Assistant"
          className="h-48 w-48 md:h-80 md:w-80" 
        />
      </div>
    </div>

  );
};

export default DisplayDataBanner;