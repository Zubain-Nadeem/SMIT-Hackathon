// src/Pages/CreatePitch.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generatePitch } from "../Utils/aiService";
import { savePitch } from "../Utils/firebaseService";
import { auth } from "../Config/firebase";

const CreatePitch = () => {
  const navigate = useNavigate();
  const [idea, setIdea] = useState("");
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("formal");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const pitch = await generatePitch(idea, description, tone);

    if (pitch && auth.currentUser) {
      const pitchId = await savePitch(auth.currentUser.uid, pitch);
      setLoading(false);

      if (pitchId) {
        navigate(`/pitch/${pitchId}`, { state: { pitch } });
      } else {
        alert("Failed to save pitch.");
      }
    } else {
      setLoading(false);
      alert("Failed to generate pitch. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center tracking-tight">
        Create a New Pitch
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg flex flex-col gap-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Startup Idea
          </label>
          <input
            type="text"
            placeholder="Enter your startup idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 text-gray-100 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Short Description
          </label>
          <textarea
            placeholder="Describe your idea briefly"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 text-gray-100 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows={4}
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tone (optional)
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 text-gray-100 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="formal">Formal</option>
            <option value="fun">Fun</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-500 transition"
        >
          {loading ? "Generating..." : "Generate Pitch"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mt-2 text-gray-400 hover:text-gray-200 text-sm underline"
        >
          Back to Dashboard
        </button>
      </form>
    </div>
  );
};

export default CreatePitch;
