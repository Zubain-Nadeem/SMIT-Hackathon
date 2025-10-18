import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Dashboard from "./Pages/Dashboard";
import CreatePitch from "./Pages/CreatePitch";
import GeneratedPitch from "./Pages/GeneratedPitch";

// Components
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePitch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pitch/:id"
            element={
              <ProtectedRoute>
                <GeneratedPitch />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
