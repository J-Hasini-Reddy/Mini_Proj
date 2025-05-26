// SearchBar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SearchBar.css';

function SearchBar() {
  const navigate = useNavigate();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const topCities = ["Hyderabad", "Delhi", "Mumbai", "Kolkata"];
  const topUniversities = [
    "Bhoj Reddy Engineering College For Women",
    "JNTU Hyderabad",
    "Osmania University",
    "Vignan University",
    "VNR Vignana Jyothi Institute of Engineering & Technology",
    "K L University",
    "Sreenidhi Institute of Science and Technology"
  ];

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input mb-3"
        placeholder="Search by city, university or property"
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />
      {showSuggestions && (
        <div className="suggestions-container w-100 bg-white shadow rounded mt-2 p-3">
          <div className="mb-4">
            <h5 className="section-title mb-2">Top Cities</h5>
            <div className="row">
              {topCities.map((city, idx) => (
                <div className="col-6" key={idx}>
                  <div className="suggestion-item">
                    {city}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5 className="section-title mb-2">Top Universities</h5>
            <div className="row">
              {topUniversities.map((university, idx) => (
                <div className="col-6" key={idx}>
                  <div className="suggestion-item">
                    {university}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
