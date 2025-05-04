import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/projects/getAll").then((response) => {
      setProjects(response.data.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          Project Dashboard
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
          <button
            onClick={() => navigate("/create-project")}
            className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Create New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">No projects found</p>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-blue-800">
                  {project.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
