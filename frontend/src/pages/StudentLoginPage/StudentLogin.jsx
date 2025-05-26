import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./student.css";
import "../../styles/iconStyles.css";
import studentIllustration from "./Student.png";
import userIcon from "../../styles/user_icon.png";

function StudentLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/student/login", credentials);

      const { token, student } = res.data;

      // ✅ Save token and user info
      localStorage.setItem("studentToken", token);
      localStorage.setItem("studentInfo", JSON.stringify(student));

      // ✅ Set default Authorization header for future axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      alert("Login successful!");
      navigate("/student/home");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={studentIllustration} alt="Student" className="illustration-img" />
      </div>
      <div className="login-right">
        <div className="login-card">
          <img
            src={userIcon}
            alt="avatar"
            className="profile-icon"
          />
          <h2 className="welcome-title">Welcome back</h2>

          <div className="d-flex justify-content-center mb-3">
            <button
              className="btn btn-primary me-2"
              onClick={() => navigate("/student/login")}
              disabled
            >
              Student
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/owner/login")}
            >
              Property Owner
            </button>
          </div>

          <form onSubmit={handleLogin}>
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="form-input"
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="form-input"
              onChange={handleChange}
              required
            />
            <button type="submit" className="login-button">Login</button>
          </form>

          <p className="signup-text">
            Don’t have an account?{" "}
            <span
              className="signup-link"
              onClick={() => navigate("/student/register")}
              style={{ cursor: "pointer", textDecoration: "underline", color: "#007bff" }}
            >
              Sign up here
            </span>
          </p>

          <div className="social-icons mt-3">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-google"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin-in"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
