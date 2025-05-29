import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from "axios";
import { useEffect } from "react";

import WelcomePage from './pages/WelcomePage/WelcomePage';
import StudentHome from './pages/StudentHome';
import StudentProfile from './pages/StudentProfile';
import OwnerDashboard from './pages/OwnerDashboard';
import AddListing from './pages/AddListing';
import StudentRegister from './pages/StudentRegisterPage/StudentRegister';
import OwnerRegister from './pages/OwnerRegisterPage/OwnerRegister';
import StudentLogin from './pages/StudentLoginPage/StudentLogin';
import OwnerLogin from './pages/OwnerLoginPage/OwnerLogin';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import UsersPage from './pages/admin/Users';
import StudentRecommendations from './pages/StudentRecommendations';
import ProtectedRoute from "./components/ProtectedRoute";
import ChatPage from "./components/chat/ChatPage";

function App() {
  // ✅ Setup Axios Authorization header once on app load
  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/owner/register" element={<OwnerRegister />} />
        <Route path="/owner/login" element={<OwnerLogin />} />

        <Route path="/student/home" element={
          <ProtectedRoute role="student">
            <StudentHome />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/student/recommendations" element={
          <ProtectedRoute role="student">
            <StudentRecommendations />
          </ProtectedRoute>
        } />
        <Route path="/owner/home" element={
          <ProtectedRoute tokenKey="ownerToken">
          <OwnerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/owner/add-listing" element={<AddListing />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
        <Route path="/chat" element={
          <ProtectedRoute role="student">
            <ChatPage />
          </ProtectedRoute>
        } />
      </Routes>
      <div id="toast-container" className="toast-container"></div>
    </Router>
  );
}

export default App;
