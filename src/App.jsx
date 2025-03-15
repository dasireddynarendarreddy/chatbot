import { createContext, useState } from "react";
import SideBar from "./SideBar";
import Chat from "./Chat";

export const Hist = createContext();

function App() {
  const [predata, setpredata] = useState([]);
  const [input, setinput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [messages, setMessages] = useState([]);

  return (
    <Hist.Provider value={{ predata, setpredata, input, setinput,messages,setMessages }}>
      <div>
        
       
          <SideBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
       </div>

      
          <Chat />
        
      
    </Hist.Provider>
  );
}

export default App;
