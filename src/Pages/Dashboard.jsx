// src/Pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPitches } from "../Utils/firebaseService";
import { auth } from "../Config/firebase";

const Dashboard = () => {
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.warn("No user found. Try logging in again.");
        setLoading(false);
        return;
      }

      const userPitches = await getUserPitches(user.uid);
      setPitches(userPitches);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-300">
        Loading your pitches...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Your Pitches</h1>
        <button
          onClick={() => navigate("/create")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500 transition"
        >
          + Create New Pitch
        </button>
      </div>

      {/* Pitch List */}
      {pitches.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          <p>No pitches found.</p>
          <button
            onClick={() => navigate("/create")}
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
          >
            Create Your First Pitch
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pitches.map((pitch) => (
            <div
              key={pitch.id}
              onClick={() =>
                navigate(`/pitch/${pitch.id}`, { state: { pitch } })
              }
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/20 transition cursor-pointer"
            >
              <h2 className="text-xl font-semibold mb-2 text-white">
                {pitch.name || "Untitled Pitch"}
              </h2>
              <p className="text-gray-400 text-sm line-clamp-2">
                {pitch.tagline || "No tagline available"}
              </p>
              <p className="text-xs text-gray-500 mt-3">
                {pitch.createdAt?.seconds
                  ? new Date(pitch.createdAt.seconds * 1000).toLocaleDateString()
                  : "Unknown date"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
