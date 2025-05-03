import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={() => {
          navigate("/create-project");
        }}
        className="px-6 py-3 text-white bg-blue-800 rounded-2xl shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out hover:scale-105"
      >
        New Project
      </button>
    </div>
  );
};

export default Home;
