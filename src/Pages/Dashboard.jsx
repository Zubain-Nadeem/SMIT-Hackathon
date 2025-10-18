// src/Pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPitches } from "../Utils/firebaseService";
import { auth } from "../Config/firebase";

const Dashboard = () => {
  const navigate = useNavigate();
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPitches = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        try {
          const data = await getUserPitches(userId);
          // Sort by creation date (latest first) if available
          const sortedPitches = data.sort((a, b) => b.createdAt - a.createdAt);
          setPitches(sortedPitches);
        } catch (err) {
          console.error("Failed to fetch pitches:", err);
        }
      }
      setLoading(false);
    };

    fetchPitches();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Pitches</h1>

      <button
        onClick={() => navigate("/create")}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        + Create New Pitch
      </button>

      {loading ? (
        <div className="text-center mt-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-gray-200 mx-auto mb-2"></div>
          <p>Loading pitches...</p>
        </div>
      ) : pitches.length === 0 ? (
        <p>No pitches generated yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pitches.map((pitch) => (
            <div
              key={pitch.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
              onClick={() => navigate(`/pitch/${pitch.id}`, { state: { pitch } })}
            >
              <h2 className="text-xl font-semibold text-gray-900">{pitch.name}</h2>
              <p className="text-gray-600 mt-2">{pitch.tagline}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
