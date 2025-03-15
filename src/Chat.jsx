import React, { useContext, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Hist } from "./App";
import './App.css'
const Chat= () => {
  const [messages, setMessages] = useState([]);
  const { predata, setpredata, input, setinput } = useContext(Hist);
  const[loading,setloading]=useState(false)

  const handleSend = async () => {
    if (!input.trim()) return;

    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    console.log(API_KEY);
       setloading(true)
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = input;
    const result = await model.generateContent(prompt);
    if(result)
    {
      console.log(true)
      setloading(false)
    }
    
    messages.push({
      question: input,
      answer: result.response.text()
    });

    setpredata([...predata, input]);
    console.log(messages);
    console.log(result.response.text());

    setinput("");
  };

  return (
    <>
      <div className="flex flex-col flex-grow h-screen p-5 bg-gray-100 w-full">
      {loading?<div className="loader"></div>:""}
        <div className="flex-grow overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="p-3 rounded-lg my-2">
              <div className="bg-blue-500 text-white p-3 rounded-lg shadow-lg max-w-xs">
                {msg.question}
              </div>
              <div>{msg.answer}</div>
              
            </div>
          
          ))}
        </div>

        <div className="flex mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setinput(e.target.value)}
            className="flex-grow p-3 border rounded-l-md"
            placeholder="Type your message..."
          />
          <button onClick={handleSend} className="bg-green-500 text-white px-4 rounded-r-md">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;

