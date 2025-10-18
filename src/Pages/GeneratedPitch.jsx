// src/Pages/GeneratedPitch.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GeneratedPitch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pitch = location.state?.pitch || {
    name: "MentorMate",
    tagline: "Guidance Meets Growth.",
    elevatorPitch: "A platform connecting learners with industry mentors.",
    problem: "Students struggle to find mentors in their field.",
    solution: "MentorMate connects students directly with mentors for guidance.",
    targetAudience: "College students, young professionals",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Generated Pitch</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-900">{pitch.name}</h2>
        <p className="text-gray-600 italic">{pitch.tagline}</p>

        <div className="mt-4">
          <h3 className="font-semibold text-gray-800">Elevator Pitch:</h3>
          <p className="text-gray-700">{pitch.elevatorPitch}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">Problem:</h3>
          <p className="text-gray-700">{pitch.problem}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">Solution:</h3>
          <p className="text-gray-700">{pitch.solution}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">Target Audience:</h3>
          <p className="text-gray-700">{pitch.targetAudience}</p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Regenerate
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
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
