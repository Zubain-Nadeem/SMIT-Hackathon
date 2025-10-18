// src/Utils/aiService.js
import axios from 'axios';

export const generatePitch = async (idea, description, tone = 'formal') => {
  try {
    const prompt = `
      Generate a startup pitch for this idea:
      Idea: ${idea}
      Description: ${description}
      Tone: ${tone}

      Output strict JSON ONLY with keys:
      name, tagline, elevatorPitch, problem, solution, targetAudience
    `;

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/chat/completions',
      {
        model: 'gemini-2.5-flash',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_GEMINI_API_KEY}`,
        },
      }
    );

    let text = response.data.choices[0].message.content;

    // Remove any backticks or markdown
    text = text.replace(/```json|```/g, '').trim();

    const pitch = JSON.parse(text);
    return pitch;
  } catch (err) {
    console.error('AI generation error:', err);
    return null;
  }
};
