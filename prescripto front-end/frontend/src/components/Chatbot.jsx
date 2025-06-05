import React, { useState, useRef } from "react";
import { gemini } from "./gemini";
import "tailwindcss/tailwind.css";
import { assets } from "../assets/assets";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);


  const handleSendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { text: input, sender: "user" };
  const updatedMessages = [...messages, userMessage];
  setMessages(updatedMessages);
  setInput("");
  setIsTyping(true);

  try {
    const result = await gemini(updatedMessages);
    const botMessage = {
      text: result.candidates[0].content.parts[0].text,
      sender: "bot",
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  } catch (error) {
    const errorMessage = { text: `Error: ${error.message}`, sender: "bot" };
    setMessages((prevMessages) => [...prevMessages, errorMessage]);
  } finally {
    setIsTyping(false);
  }
};

return (
  <div className="flex flex-col items-center bg-gray-100 rounded-xl sm:p-4 h-full relative">
    <div className="hidden sm:block absolute inset-0 bg-[url('https://c8.alamy.com/comp/T84XXF/seamless-pattern-with-healthcare-medicine-and-pharmacy-icons-and-symbols-medical-background-doodle-T84XXF.jpg')] opacity-10 pointer-events-none rounded-xl"></div>

    <div className="w-full sm:max-w-2xl bg-white shadow-md rounded-xl px-3 sm:px-7 pb-4 sm:pb-5 pt-3 sm:pt-4 border border-gray-200 relative z-10">
      <h1 className="text-xl sm:text-2xl text-[#5f6FFF] font-semibold mb-3 sm:mb-4 text-center">
        Healthcare Assistant
      </h1>

      <div className="h-[60vh] sm:h-[450px] overflow-y-auto mb-4 p-3 border border-gray-300 rounded-xl bg-gray-50 shadow-inner">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-center mb-4 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "bot" && (
              <div className="flex items-start">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#5f6FFF] flex items-center justify-center mr-2 sm:mr-3 text-white font-bold shadow-md overflow-hidden">
                  <img src={assets.ai_chat} alt="AI" className="w-full h-full object-cover" />
                </div>
                <div className="p-2 sm:p-3 rounded-lg bg-white shadow-md text-gray-800 max-w-[75%] sm:max-w-md">
                  <p className="text-sm sm:text-base">{message.text}</p>
                </div>
              </div>
            )}
            {message.sender === "user" && (
              <div className="flex items-end">
                <div className="p-2 pr-5 sm:p-3 rounded-lg bg-[#5f6FFF] text-white shadow-md max-w-[75%] sm:max-w-md">
                  <p className="text-sm sm:text-base">{message.text}</p>
                </div>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#5f6FFF] flex items-center justify-center mr-2 sm:mr-3 text-white font-bold shadow-md">
              AI
            </div>
            <div className="p-2 sm:p-3 rounded-lg bg-white shadow-md text-gray-800 max-w-[75%] sm:max-w-md">
              <p className="text-sm sm:text-base">Typing...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your questions..."
          className="w-full p-3 rounded-full focus:outline-none border border-gray-300 bg-white placeholder-gray-500 shadow-sm text-sm sm:text-base"
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="w-full sm:w-auto py-2 px-4 bg-[#5f6FFF] text-white font-semibold rounded-lg shadow-md hover:bg-[#4a5edb] transition text-sm sm:text-base"
        >
          Send
        </button>
      </div>
    </div>
  </div>
);

}

export default Chatbot;
