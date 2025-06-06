import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import "../../styles/iconStyles.css";
import ownerIllustration from "./Owner.png";
import axios from "axios";
import userIcon from "../../styles/user_icon.png";

function OwnerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    company: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.placeholder.toLowerCase()] : e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/owner/register", formData);
      setMessage("Registration successful");
    } catch (error) {
      setMessage("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <img src={ownerIllustration} alt="Owner" className="illustration-img" />
      </div>
      <div className="register-right">
        <div className="register-card">
          <img
            src={userIcon}
            alt="avatar"
            className="profile-icon"
          />
          <h2 className="welcome-title">Create an Account</h2>

        <div className="d-flex justify-content-center mb-3">
            <button
              className="btn btn-primary me-2"
              onClick={() => navigate("/owner/register")}
              disabled
            >
              Property Owner
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/student/register")}
            >
              Student
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" className="form-input" onChange={handleChange} />
            <input type="password" placeholder="Password" className="form-input" onChange={handleChange} />
            <input type="email" placeholder="Email" className="form-input" onChange={handleChange} />
            <input type="text" placeholder="Company" className="form-input" onChange={handleChange} />
            <button type="submit" className="register-button">Register</button>
          </form>
          <p className="login-text">{message}</p>
          <p className="login-text">
            Already have an account?{" "}
            <a href="/owner/login" className="login-link">
              <u>Login here</u>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OwnerRegister;
