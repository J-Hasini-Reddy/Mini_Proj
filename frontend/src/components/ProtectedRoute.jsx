
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem(role === "student" ? "studentToken" : "ownerToken");

  if (!token) {
    return <Navigate to={role === "student" ? "/student/login" : "/owner/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
