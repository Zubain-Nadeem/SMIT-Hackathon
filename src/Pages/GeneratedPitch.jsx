// src/Pages/GeneratedPitch.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import { generatePitch } from "../Utils/aiService";
import { savePitch } from "../Utils/firebaseService";
import { auth } from "../Config/firebase";

const GeneratedPitch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pitch, setPitch] = useState(location.state?.pitch || null);
  const [loading, setLoading] = useState(false);

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
      const userId = auth.currentUser?.uid;
      if (userId) await savePitch(userId, newPitch);
    } else {
      alert("Failed to regenerate pitch. Try again.");
    }
  };

  const handleExport = () => {
    const doc = new jsPDF();
    let y = 20;
    const display = pitch || placeholder;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(display.name, 10, y);
    y += 10;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(14);
    doc.text(display.tagline, 10, y);
    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    y += 10;

    const sections = [
      { title: "Elevator Pitch", content: display.elevatorPitch },
      { title: "Problem", content: display.problem },
      { title: "Solution", content: display.solution },
      { title: "Target Audience", content: display.targetAudience },
    ];

    sections.forEach((section) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${section.title}:`, 10, y);
      y += 7;

      doc.setFont("helvetica", "normal");
      const splitText = doc.splitTextToSize(section.content, 180);
      doc.text(splitText, 10, y);
      y += splitText.length * 7 + 5;
    });

    doc.save(`${display.name}_Pitch.pdf`);
  };

  const displayPitch = pitch || placeholder;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-gray-900 border border-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Generated Pitch</h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-blue-400">{displayPitch.name}</h2>
            <p className="italic text-gray-400">{displayPitch.tagline}</p>
          </div>

          <div className="space-y-4">
            <section>
              <h3 className="font-semibold text-gray-300 mb-1">Elevator Pitch</h3>
              <p className="text-gray-200 leading-relaxed">{displayPitch.elevatorPitch}</p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-300 mb-1">Problem</h3>
              <p className="text-gray-200 leading-relaxed">{displayPitch.problem}</p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-300 mb-1">Solution</h3>
              <p className="text-gray-200 leading-relaxed">{displayPitch.solution}</p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-300 mb-1">Target Audience</h3>
              <p className="text-gray-200 leading-relaxed">{displayPitch.targetAudience}</p>
            </section>
          </div>

          <div className="flex flex-wrap gap-4 mt-8 justify-center">
            <button
              onClick={handleRegenerate}
              disabled={loading}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition disabled:opacity-50"
            >
              {loading ? "Regenerating..." : "Regenerate"}
            </button>

            <button
              onClick={handleExport}
              className="px-5 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white font-medium transition"
            >
              Export as PDF
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedPitch;
