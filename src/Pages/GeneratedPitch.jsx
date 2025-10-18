// src/Pages/GeneratedPitch.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { generatePitch } from "../Utils/aiService";
import { savePitch } from "../Utils/firebaseService";
import { auth } from "../Config/firebase";

const GeneratedPitch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pitch, setPitch] = useState(location.state?.pitch || null);
  const [loading, setLoading] = useState(false);

  // If no pitch passed via state, show a placeholder
  const placeholder = {
    name: "MentorMate",
    tagline: "Guidance Meets Growth.",
    elevatorPitch: "A platform connecting learners with industry mentors.",
    problem: "Students struggle to find mentors in their field.",
    solution: "MentorMate connects students directly with mentors for guidance.",
    targetAudience: "College students, young professionals",
  };

  const handleRegenerate = async () => {
    if (!pitch) return;
    setLoading(true);
    const newPitch = await generatePitch(pitch.name, pitch.elevatorPitch, "formal");
    setLoading(false);

    if (newPitch) {
      setPitch(newPitch);
      // Save regenerated pitch to Firebase
      const userId = auth.currentUser?.uid;
      if (userId) {
        await savePitch(userId, newPitch);
      }
    } else {
      alert("Failed to regenerate pitch. Try again.");
    }
  };

  const displayPitch = pitch || placeholder;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Generated Pitch</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-900">{displayPitch.name}</h2>
        <p className="text-gray-600 italic">{displayPitch.tagline}</p>

        <div className="mt-4">
          <h3 className="font-semibold text-gray-800">Elevator Pitch:</h3>
          <p className="text-gray-700">{displayPitch.elevatorPitch}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">Problem:</h3>
          <p className="text-gray-700">{displayPitch.problem}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">Solution:</h3>
          <p className="text-gray-700">{displayPitch.solution}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">Target Audience:</h3>
          <p className="text-gray-700">{displayPitch.targetAudience}</p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={handleRegenerate}
            disabled={loading}
          >
            {loading ? "Regenerating..." : "Regenerate"}
          </button>

          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            onClick={() => alert("Export/Share feature coming soon!")}
          >
            Export / Share
          </button>

          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneratedPitch;
