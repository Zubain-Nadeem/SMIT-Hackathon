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

      // ✅ Wait for Firebase auth to initialize
      if (!user) {
        console.warn("No user found. Try logging in again.");
        setLoading(false);
        return;
      }

      console.log("Current User UID:", user.uid);

      const userPitches = await getUserPitches(user.uid);
      console.log("Fetched Pitches:", userPitches);

      setPitches(userPitches);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600">
        Loading your pitches...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Pitches</h1>
        <button
          onClick={() => navigate("/create")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          + Create New Pitch
        </button>
      </div>

      {pitches.length === 0 ? (
        <p className="text-gray-600 text-center">
          No pitches found. Try creating one!
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pitches.map((pitch) => (
            <div
              key={pitch.id}
              className="bg-white shadow-md p-4 rounded-lg cursor-pointer hover:shadow-lg transition"
              onClick={() =>
                navigate(`/pitch/${pitch.id}`, { state: { pitch } })
              }
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {pitch.name || "Untitled Pitch"}
              </h2>
              <p className="text-gray-600 mt-1">{pitch.tagline || "No tagline"}</p>
              <p className="text-sm text-gray-500 mt-2">
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
