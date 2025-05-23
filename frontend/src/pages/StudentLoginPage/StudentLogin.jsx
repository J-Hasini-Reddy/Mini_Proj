import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./student.css";
import studentIllustration from "./Student.png";

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
      localStorage.setItem("studentToken", res.data.token); 
      alert("Login successful!");
      console.log(res.data);
      navigate("/student/home"); // Redirect after successful login
    } catch (err) {
      alert("Login failed.");
      console.error(err);
      }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={studentIllustration} alt="Student" className="illustration-img" />
      </div>
      <div className="login-right">
        <div className="login-card">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="avatar" className="profile-icon" />
          <h2 className="welcome-title">Welcome back</h2>
          <form onSubmit={handleLogin}>
            <input name="username" type="text" placeholder="Username" className="form-input" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" className="form-input" onChange={handleChange} required />
            <button type="submit" className="login-button">Login</button>
          </form>
          <p className="signup-text">
            Don’t have an account? <a href="/register" className="signup-link"><u>Sign up here</u></a>
          </p>
          <div className="social-icons">
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
