import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserPitches } from "../Utils/firebaseService";
import { auth } from "../Config/firebase";

const LandingPage = () => {
  const { pitchId } = useParams();
  const [pitch, setPitch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPitch = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      const userPitches = await getUserPitches(user.uid);
      const foundPitch = userPitches.find((p) => p.id === pitchId);
      setPitch(foundPitch);
      setLoading(false);
    };

    fetchPitch();
  }, [pitchId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
        Loading landing page...
      </div>
    );
  }

  if (!pitch) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-500">
        Pitch not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center px-6 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-700/30 via-blue-800/20 to-purple-900/30 blur-3xl opacity-50" />
        <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
          {pitch.name}
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mb-10">
          {pitch.tagline}
        </p>

        <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg">
          Get Started
        </button>
      </section>

      {/* Elevator Pitch */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold text-green-400 mb-4">What We Do</h2>
        <p className="text-gray-300 text-lg leading-relaxed">{pitch.elevatorPitch}</p>
      </section>

      {/* Problem / Solution Cards */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-16">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800 hover:border-green-500 transition">
          <h3 className="text-2xl font-semibold mb-3 text-blue-400">The Problem</h3>
          <p className="text-gray-300 leading-relaxed">{pitch.problem}</p>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800 hover:border-blue-500 transition">
          <h3 className="text-2xl font-semibold mb-3 text-purple-400">The Solution</h3>
          <p className="text-gray-300 leading-relaxed">{pitch.solution}</p>
        </div>
      </section>

      {/* Target Audience */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center border-t border-gray-800">
        <h2 className="text-3xl font-semibold text-yellow-400 mb-4">
          Who It's For
        </h2>
        <p className="text-gray-300 text-lg">{pitch.targetAudience}</p>
      </section>

      {/* CTA Section */}
      <section className="text-center py-24 bg-gradient-to-r from-blue-800/30 via-purple-700/30 to-green-700/30">
        <h2 className="text-4xl font-bold mb-4">Ready to Join {pitch.name}?</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Be part of the journey. Experience the future of innovation today.
        </p>
        <button className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-full font-semibold transition">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm border-t border-gray-800">
        © {new Date().getFullYear()} {pitch.name}. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
