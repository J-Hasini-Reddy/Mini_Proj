import React, { useState } from "react";
import "./Owner.css";
import "../../styles/iconStyles.css";
import ownerIllustration from "./Owner.png";
import axios from "axios";
import userIcon from "../../styles/user_icon.png";
import { useNavigate } from "react-router-dom";



function OwnerLogin() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/owner/login", formData);
      localStorage.setItem("ownerToken", response.data.token); 
      setMessage("Login successful");
      navigate("/owner/home");
    } catch (error) {
      setMessage("Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={ownerIllustration} alt="Owner" className="illustration-img" />
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
              onClick={() => navigate("/owner/login")}
              disabled
            >
              Property Owner
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/student/login")}
            >
              Student
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" className="form-input" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" className="form-input" onChange={handleChange} />

            <button type="submit" className="login-button">Login</button>
          </form>
          <p className="signup-text">{message}</p>
          <p className="signup-text">
            Don’t have an account?{" "}
            <a href="/owner/register" className="signup-link">
              <u>Sign up here</u>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OwnerLogin;
