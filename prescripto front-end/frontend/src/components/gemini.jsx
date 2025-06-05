import axios from 'axios';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY2; 
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export const gemini = async (messages) => {
  try {
    const contents = [
  {
    role: "user",
    parts: [{
      text: `You are a helpful and professional healthcare assistant. Answer all future questions in a single, concise paragraph without any headings or subject lines.`
    }]
  },
  ...messages.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }))
];


    const response = await axios.post(GEMINI_API_URL, {
      contents
    });

    return response.data;
  } catch (error) {
    console.error('Error making the request:', error);
    throw error;
  }
};

export default gemini;

