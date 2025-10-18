import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "./Auth/Login";
import Register from "./Auth/Register"; // <-- import Register
import Dashboard from "./Pages/Dashboard";
import CreatePitch from "./Pages/CreatePitch";
import GeneratedPitch from "./Pages/GeneratedPitch";

// Optional: import Navbar if you have one
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreatePitch />} />
          <Route path="/pitch/:id" element={<GeneratedPitch />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
