import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>

      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="flex my-10 flex-col md:flex-row gap-12 justify-center">
        <img className="w-full md:max-w-[360px]" src={assets.about_image} />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to Prescripto, where cutting-edge technology meets
            compassionate healthcare. Our mission is to revolutionize the way
            diseases are predicted and managed, empowering individuals and
            healthcare professionals with advanced AI-driven tools.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            We envision a world where early disease detection and personalized
            healthcare are accessible to everyone. By harnessing the power of
            artificial intelligence, we aim to transform the healthcare
            landscape, making it more proactive, efficient, and
            patient-centered.
          </p>

          <b className="text-gray-800">What We Do</b>
          <p>
            At Prescripto, we specialize in AI-powered disease
            prediction and healthcare assistance. Our platform leverages
            state-of-the-art machine learning models to analyze vast amounts of
            medical data, providing accurate predictions and actionable
            insights. Whether you're a patient seeking early diagnosis or a
            healthcare provider looking to enhance your practice, our tools are
            designed to support you every step of the way.
          </p>

        </div>
      </div>
      

      <div className="text-xl my-4 text-center">
        <p>WHY <span className="text-gray-700 font-semibold">CHOOSE US</span></p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div  className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px]  hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Accuracy</b>
          <p>Our AI models are rigorously tested and validated to
          ensure precise predictions.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px]  hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>User-Friendly</b>
          <p>Our platform is designed with the user in mind,
          offering intuitive interfaces and easy-to-understand results.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px]  hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Privacy</b>
          <p>We prioritize your privacy and security, adhering to strict
          data protection standards.</p>
        </div>
        
      </div>

    </div>
  );
};

export default About;
