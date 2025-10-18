// src/Auth/Login.jsx
import React, { useState } from "react";
import { auth, provider } from "../Config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User:", result.user);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Google login failed. Try again.");
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User:", userCredential.user);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Email or password incorrect.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">PitchCraft Login</h1>

        {/* Email/Password form */}
        <form onSubmit={handleEmailLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <div className="my-4 text-gray-500">or</div>

        {/* Google login */}
        <button
          onClick={handleGoogleLogin}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Sign in with Google
        </button>

        {/* Link to Register */}
        <p className="mt-4 text-gray-500">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
