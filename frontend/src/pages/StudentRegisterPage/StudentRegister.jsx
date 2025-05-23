import React, { useState } from "react";
import axios from "axios";
import "./GradStayTheme.css";
import studentIllustration from "./Student.png";

function StudentRegister() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    college: "",
    course: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/student/register", formData);
      setMessage("Registration successful! Please login.");
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <img src={studentIllustration} alt="Student" className="illustration-img" />
      </div>
      <div className="register-right">
        <div className="register-card">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="avatar" className="profile-icon" />
          <h2 className="welcome-title">Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" className="form-input" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" className="form-input" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email Address" className="form-input" onChange={handleChange} />
            <input type="text" name="college" placeholder="College/Office Name" className="form-input" onChange={handleChange} />
            <select name="course" className="form-input" onChange={handleChange}>
              <option>Select Course</option>
              <option>B.Tech</option>
              <option>B.Sc</option>
              <option>B.Com</option>
            </select>
            <button type="submit" className="register-button">Register</button>
          </form>
          {message && <p style={{ color: "red" }}>{message}</p>}
          <p className="login-text">
            Already have an account? <a href="/student-login" className="login-link"><u>Login here</u></a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentRegister;
