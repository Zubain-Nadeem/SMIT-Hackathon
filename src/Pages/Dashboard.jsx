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
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
        Loading your pitches...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Pitches</h1>
        <button
          onClick={() => navigate("/create")}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white transition"
        >
          + Create New Pitch
        </button>
      </div>

      {pitches.length === 0 ? (
        <p className="text-gray-400 text-center">No pitches yet. Create one!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pitches.map((pitch) => (
            <div
              key={pitch.id}
              className="bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {pitch.name || "Untitled Pitch"}
              </h2>
              <p className="text-gray-400 text-sm mb-3">{pitch.tagline || "No tagline"}</p>

              <p className="text-gray-500 text-xs mb-4">
                {pitch.createdAt?.seconds
                  ? new Date(pitch.createdAt.seconds * 1000).toLocaleDateString()
                  : "Unknown date"}
              </p>

              <div className="flex gap-2">
                <button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
                  onClick={() => navigate(`/pitch/${pitch.id}`, { state: { pitch } })}
                >
                  View Pitch
                </button>
                <button
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm"
                  onClick={() => navigate(`/landing/${pitch.id}`)}
                >
                  Generate Landing Page
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
