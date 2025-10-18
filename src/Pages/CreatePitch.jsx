// src/Pages/CreatePitch.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generatePitch } from '../Utils/aiService';

const CreatePitch = () => {
  const navigate = useNavigate();
  const [idea, setIdea] = useState('');
  const [description, setDescription] = useState('');
  const [tone, setTone] = useState('formal');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const pitch = await generatePitch(idea, description, tone);

    setLoading(false);

    if (pitch) {
      navigate('/pitch/1', { state: { pitch } });
    } else {
      alert('Failed to generate pitch. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create a New Pitch</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto flex flex-col gap-4"
      >
        <label className="text-gray-700 font-semibold">Startup Idea</label>
        <input
          type="text"
          placeholder="Enter your startup idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <label className="text-gray-700 font-semibold">Short Description</label>
        <textarea
          placeholder="Describe your idea briefly"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          required
        ></textarea>

        <label className="text-gray-700 font-semibold">Tone (optional)</label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="formal">Formal</option>
          <option value="fun">Fun</option>
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition mt-4"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Pitch'}
        </button>
      </form>
    </div>
  );
};

export default CreatePitch;
