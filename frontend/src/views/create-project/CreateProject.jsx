import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    axios.post("https://ai-code-reviewer-81km.onrender.com/projects/create", {
       projectName 
      }).then((res)=>{
        navigate("/");
      })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl space-y-4">
      <input
        type="text"
        name="projectName"
        placeholder="Project Name"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setProjectName(e.target.value)}
        value={projectName}
      />

      <input
        type="submit"
        className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
      />
    </form>
  );
};

export default CreateProject;
