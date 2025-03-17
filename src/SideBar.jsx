import { useContext, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Hist } from "./App"; 
import { ArrowUturnRightIcon } from "@heroicons/react/24/solid";

import './SideBar.css'
const SideBar = () => {
  const { predata, setpredata, setinput,messages,setMessages } = useContext(Hist);
  const [isOpen, setIsOpen] = useState(false);

  const removeItem = (index) => {
    setpredata(predata.filter((_, i) => i !== index));
    setMessages(messages.filter((_,i)=>i!==index))
    
  };

  return (
    <>
      
      <button
        className="sm:hidden fixed top-4 left-4 text-white bg-gray-900 p-2 rounded z-50"
        onClick={() => setIsOpen(true)}
      >
        Menu
      </button>

     
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-5 transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform sm:translate-x-0 sm:relative sm:flex-shrink-0 z-50 shadow-lg`}
      >
        
        <button
          className="sm:hidden absolute top-4 right-4 text-white"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>

        <h2 className="text-xl font-bold mb-5">GPT</h2>

        {/*<button className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600">
          + New Chat
        </button>*/}

        
        <div id="sidebar" className="mt-4 space-y-2">
          {predata.length>0?<p className="text-gray-400 text-center">Your History</p>:""}
          {predata.length === 0 ? (
            <p className="text-gray-400 text-center">No history available</p>
          ) : (
            predata.map((d, i) => (
              <div key={i} className="bg-white text-black rounded-md p-2 flex justify-between items-center cursor-pointer">
                <span onClick={() => setinput(d)}>{d.length>20?d.substr(0,20):d+"..."}</span>
                <TrashIcon
                  className="w-6 h-6 text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    removeItem(i);
                  }}
                />
                <a href={"#"+d}><ArrowUturnRightIcon className="w-6 h-6 text-blue-500" onClick={()=>setinput(d)} /></a>
              </div>
            ))
          )}
        </div>
      </div>

     
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 sm:hidden z-40"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        ></div>
      )}
    </>
  );
};

export default SideBar;
