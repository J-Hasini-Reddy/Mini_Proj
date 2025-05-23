import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
/*import PropertiesPage from './pages/admin/Properties';
import FeedbackPage from './pages/admin/feedback';
import Analytics from './pages/admin/Analytics';


<Route path="properties" element={<PropertiesPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="analytics" element={<Analytics />} />



*/
 



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/owner/home" element={<OwnerDashboard />} />
        <Route path="/owner/add-listing" element={<AddListing />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/owner-register" element={<OwnerRegister />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/owner-login" element={<OwnerLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
          
        </Route>
      </Routes>
      <div id="toast-container" className="toast-container"></div>
    </Router>
  );
}

export default App;
