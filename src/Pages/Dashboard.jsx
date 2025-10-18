// src/Pages/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Placeholder pitches
  const pitches = [
    { id: 1, name: "MentorMate", tagline: "Guidance Meets Growth." },
    { id: 2, name: "FoodFinder", tagline: "Discover local flavors instantly." },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Pitches</h1>

      <button
        onClick={() => navigate("/create")}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        + Create New Pitch
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pitches.map((pitch) => (
          <div
            key={pitch.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
            onClick={() => navigate(`/pitch/${pitch.id}`)}
          >
            <h2 className="text-xl font-semibold text-gray-900">{pitch.name}</h2>
            <p className="text-gray-600 mt-2">{pitch.tagline}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
