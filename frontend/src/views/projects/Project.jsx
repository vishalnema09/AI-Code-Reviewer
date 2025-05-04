import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { io } from "socket.io-client";

const Project = () => {
  const params = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    io("http://localhost:3000")
  })

  return (
    <div className="min-h-screen flex gap-4 p-4 bg-gray-100">
      {/* Chat Section */}
      <div className="bg-emerald-100 rounded-lg shadow-md p-4 flex flex-col justify-between flex-1">
        <div className="flex flex-col space-y-2 p-2 h-[600px] overflow-y-auto custom-scroll">
          {/* Messages go here */}
          {messages.map((message)=>{
            return (
              <span className="inline-block bg-white text-gray-800 px-4 py-2 rounded-xl shadow-sm w-fit">
            {message}
          </span>
            )
          }
        )}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Message to project"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">
            <FiSend size={20} />
          </button>
        </div>
      </div>

      {/* Code Section */}
      <div className="bg-gray-800 rounded-lg shadow-md p-4 flex-1">
        {/* Add code editor content here */}
      </div>

      {/* Review Section */}
      <div className="bg-indigo-300 rounded-lg shadow-md p-4 flex-1">
        {/* Add review content here */}
      </div>
    </div>
  );
};

export default Project;
