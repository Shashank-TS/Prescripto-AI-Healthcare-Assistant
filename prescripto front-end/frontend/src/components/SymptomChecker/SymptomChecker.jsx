import React, { useState } from "react";
import { assets } from "../../assets/assets";
import DisplayDataBanner from "../displayDataBanner";

const SymptomChecker = () => {
  const [step, setStep] = useState(1);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState("");
  const [loading, setLoading] = useState(false);
  const [finalDiagnosis, setFinalDiagnosis] = useState([]);

  const handleContinue = async () => {
    if (step === 1 && age && gender) {
      setStep(2);
    } else if (step === 2 && symptoms) {
      setLoading(true);
      const prompt = `User details:\nAge: ${age}\nGender: ${gender}\nSymptoms: ${symptoms}\n\nBased on the above data, ask the user 2 to 3 questions to clarify symptoms. Don't generate subject line and avoid using star marks  or decorative characters and question numbers dirctly give the questions`;
      const response = await fetchGeminiResponse(prompt);
      const reply = response?.candidates?.[0]?.content?.parts?.[0]?.text;
      setQuestions(reply?.split("\n").filter((q) => q.trim()) || []);
      setLoading(false);
      setStep(3);
    } else if (step === 3 && answers) {
      setLoading(true);

      const prompt = `User details:\nAge: ${age}\nGender: ${gender}\nSymptoms: ${symptoms}\n\nFollow-up answers:\n${answers}\n\nBased on all of the above, return a JSON array as follows: { "data": [{ "disease_name": "...", "explanation": "..." }] }. Avoid using star marks or decorative characters. Respond only with the JSON and nothing else.`;
      const response = await fetchGeminiResponse(prompt);
      const content = response?.candidates?.[0]?.content?.parts?.[0]?.text;
      try {
        const parsed = JSON.parse(content);
        setFinalDiagnosis(parsed.data || []);
      } catch (err) {
        try {
          //  extracting JSON block using regex as fallback
          const jsonMatch = content.match(/{[\s\S]*}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            setFinalDiagnosis(parsed.data || []);
          } else {
            throw new Error("No valid JSON found.");
          }
        } catch (fallbackErr) {
          console.error("Error parsing AI response (fallback):", fallbackErr);
          setFinalDiagnosis([]);
        }
      }

      setLoading(false);
      setStep(4);
    }
  };

  const fetchGeminiResponse = async (userPrompt) => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userPrompt }],
            },
          ],
        }),
      }
    );
    return await response.json();
  };

  return (
    <>
      <div className="flex flex-col items-center p-4 md:p-10">
        <h1 className="text-3xl md:text-5xl font-bold text-center sm:mb-3">
          Symptom Checker
        </h1>
        <p className="text-xl md:text-3xl font-semibold text-primary mb-6 text-center">
          powered by AI
        </p>

        <div
          className={`w-full max-w-4xl bg-[#F5F5F5] p-4 mt-3 md:p-10 rounded-xl shadow ${
            step === 4 ? "max-w-6xl" : "max-w-4xl"
          }`}
        >
          {step === 1 && (
            <>
              <p className="text-center font-semibold sm:text-xl text-blue-500 mb-4 sm:mb-8">
                General Information (Step 1/3)
              </p>
              <div className="flex flex-col md:flex-row gap-4 sm:gap-10">
                <div className="flex-1">
                  <label className="font-semibold text-base sm:text-xl">
                    Age
                  </label>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 mt-1 sm:mt-2">
                    Age significantly impacts health risks and wellness
                    strategies.
                  </p>
                  <input
                    type="number"
                    placeholder="e.g. 48"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
                <div className="flex-1">
                  <label className="font-semibold text-base sm:text-xl">
                    Sex assigned at birth
                  </label>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 mt-1 sm:mt-2">
                    Biological sex can impact risk for conditions and response
                    to treatments.
                  </p>
                  <div className="flex gap-2">
                    <button
                      className={`flex-1 p-2 rounded border text-gray-700 ${
                        gender === "Male"
                          ? "bg-blue-100 border-blue-400"
                          : "bg-white"
                      }`}
                      onClick={() => setGender("Male")}
                    >
                      Male
                    </button>
                    <button
                      className={`flex-1 p-2 rounded border text-gray-700 ${
                        gender === "Female"
                          ? "bg-blue-100 border-blue-400"
                          : "bg-white"
                      }`}
                      onClick={() => setGender("Female")}
                    >
                      Female
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-center font-semibold sm:text-2xl text-blue-500 mb-6">
                Symptoms (Step 2/3)
              </p>
              <label className="font-semibold sm:text-xl text-base">
                Describe your symptoms
              </label>
              <p className="text-sm sm:text-base text-gray-500 mb-6 mt-2 sm:mt-2 sm:mb-8">
                For accurate insights, provide detailed descriptions of your
                symptoms.
              </p>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g. I have unexpected weight loss and skin changes..."
                className="w-full text-sm sm:text-base border border-gray-300 p-2 rounded h-24"
              />
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-center font-semibold sm:text-xl text-primary mb-4">
                QUESTIONS (Step 3/3)
              </p>
              <label className="font-semibold text-lg sm:text-xl">
                Answer the following questions
              </label>
              <p className="text-sm text-gray-600 mb-5 mt-1">
                Answer a few questions to refine your symptom analysis.
              </p>
              <ul className="list-decimal pl-5 mb-5 text-gray-700 text-base">
                {questions.map((q, i) => (
                  <li key={i} className="mb-1">
                    {q}
                  </li>
                ))}
              </ul>
              <textarea
                value={answers}
                onChange={(e) => setAnswers(e.target.value)}
                placeholder="Type your answers here..."
                className="w-full border p-2 rounded h-24"
              />
            </>
          )}

          {step === 4 && (
            <div className="text-gray-800">
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">
                Your Health Insights
              </h2>
              <div className="flex justify-center mb-4">
                <div className="rounded-full">
                  <img
                    src={assets.ai_chat}
                    alt="Chatbot"
                    className="w-20 h-20 sm:w-36 sm:h-36"
                  />
                </div>
              </div>

              {finalDiagnosis.length > 0 ? (
                <div className="space-y-4">
                  {finalDiagnosis.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-6 border rounded-lg bg-white shadow"
                    >
                      <h3 className="text-lg sm:text-xl font-semibold text-primary mb-1 sm:mb-3">
                        {item.disease_name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700">
                        {item.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-center text-gray-500">
                  No diagnosis available.
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <button className="border border-blue-700 text-primary bg-gray-50 p-2 rounded-lg flex justify-between items-center">
                  What should I do next? <span className="text-xl">›</span>
                </button>
                <button className="border border-blue-700 text-primary bg-gray-50 p-2 rounded-lg flex justify-between items-center">
                  Explain these conditions <span className="text-xl">›</span>
                </button>
                <button className="border border-blue-700 text-primary bg-gray-50 p-2 rounded-lg flex justify-between items-center">
                  Can you explain my test results?{" "}
                  <span className="text-xl">›</span>
                </button>
                <button className="border border-blue-700 text-primary bg-gray-50 p-2 rounded-lg flex justify-between items-center">
                  I need advice from a top doctor{" "}
                  <span className="text-xl">›</span>
                </button>
              </div>
            </div>
          )}

          {!loading && step < 4 && (
            <div className="text-center mt-6 mb-4">
              <button
                onClick={handleContinue}
                className="bg-primary hover:bg-[#4a5edb] text-white px-6 py-2 rounded text-lg"
              >
                Continue
              </button>
            </div>
          )}

          {loading && (
            <div className="text-center my-4">
              <p className="text-primary font-medium">
                Analyzing your symptoms, please wait...
              </p>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          )}
        </div>
      </div>
      {!loading && step === 4 && <DisplayDataBanner />}
    </>
  );
};

export default SymptomChecker;
