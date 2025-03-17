import React, { useContext, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Hist } from "./App";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {Typewriter} from 'react-simple-typewriter'
import './App.css'
const Chat= () => {
 
  const { predata, setpredata, input, setinput,messages} = useContext(Hist);
  const[loading,setloading]=useState(false)
  const[showcursor,setShowCursor]=useState(true)

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
     
      <div id="chat" className="flex flex-col flex-grow h-screen p-5 bg-gray-100 w-full">
             
        <div className="flex-grow overflow-y-auto">
          {messages.length>0?messages.map((msg, index) => (
            <div key={index} className="p-3 rounded-lg my-2">
              <div className="bg-blue-500 text-white p-3 rounded-lg shadow-lg max-w-xs">
                {msg.question}
              </div>
              <div  id={msg.question}>
                <Typewriter words={[msg.answer]} loop={1} cursor={showcursor} cursorStyle="|"  typeSpeed={40} delaySpeed={0} onLoopDone={()=>setShowCursor(false)}/>
              </div>
             
            </div>
          
          )):<div>
            <div className="justify-center align-center flex animate-bounce text-4xl font-bold">Try Gpt</div>
            </div>}
        </div>
        <div>
        {loading?<div className="loader"></div>:""}
        </div>

        <div className="flex mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setinput(e.target.value)}
            className="flex-grow p-3 border rounded-l-md"
            placeholder="Type your message..."
          />
          <button onClick={handleSend} className="bg-white text-white px-4 rounded-r-md">
          <PaperAirplaneIcon  className={input.length>0?"h-6 w-6 text-black":"h-6 w-6 text-gray-500"} disabled={input.length>0?true:false}/>
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;

