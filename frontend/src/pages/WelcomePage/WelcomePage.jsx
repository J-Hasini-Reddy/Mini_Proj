import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import SearchBar from "../../components/SearchBar";
import houseImage from './Welcome.png';
import aiRecImage from './ai rec.png';
import realChatImage from './real.png';
import rentImage from './rent.png';
import saraImage from './sara.jpg';
import micImage from './mic.jpg';
import emmaImage from './emma.png';
import logo from './logo.png';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      {/* Hero Section */} 
      <section
        id="home"
        className="vh-100 d-flex align-items-center"
        style={{
          backgroundImage: `url(${houseImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: "0",
          height: "100vh"
        }}
      >
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent fixed-top">
          <div className="container">
            <a className="navbar-brand fw-bold" href="#home">
              <img src={logo} alt="Logo" height="80" className="me-2" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item px-3">
                  <a className="nav-link fw-bold" href="#home">Home</a>
                </li>
                <li className="nav-item px-3">
                  <a className="nav-link fw-bold" href="#whychoose">Why Choose Us</a>
                </li>
                <li className="nav-item px-3">
                  <a className="nav-link fw-bold" href="#testimonials">Testimonials</a>
                </li>
                <li className="nav-item px-3">
                  <button className="btn btn-outline-primary me-2" onClick={() => navigate("/student/login")}>
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-primary" onClick={() => navigate("/student/register")}>
                    Register
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-5 pt-5">
          <div className="row text-white">
            <div className="col-md-6">
              <h2>Search, explore and book your room!</h2>
              <div className="col-md-6">
                 <SearchBar />
              </div>
              <button className="btn btn-light" onClick={() => navigate("/student/register")}>
                Find Rooms
              </button>
            </div>
            <div className="col-md-6 text-end">
              <h2>List your property. Find tenants fast.</h2>
              <button className="btn btn-light" onClick={() => navigate("/owner/register")}>
                Post a Property
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="whychoose" className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="text-black border-bottom pb-2 d-inline-block">
            Why Choose Us?
          </h2>
          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow">
                <img src={aiRecImage} className="card-img-top p-4" alt="Smart Recommendations" />
                <div className="card-body">
                  <h5 className="card-title">Smart Recommendations</h5>
                  <p className="card-text">
                    Customized housing suggestions based on your needs.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow">
                <img src={realChatImage} className="card-img-top p-4" alt="Real-time Chat" />
                <div className="card-body">
                  <h5 className="card-title">Real-time Chat Support</h5>
                  <p className="card-text">
                    Chat directly with landlords or tenants for quick help.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow">
                <img src={rentImage} className="card-img-top p-4" alt="Smart Pricing" />
                <div className="card-body">
                  <h5 className="card-title">Smart Rent Pricing</h5>
                  <p className="card-text">
                    Predict accurate rental prices with our AI tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-5 text-black border-bottom d-inline-block pb-2">
            What Our Users Say
          </h2>
          <div className="row justify-content-center">
            {/* Testimonial 1 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 p-4 shadow text-center">
                <img src={saraImage} className="rounded-circle mx-auto mb-3" alt="Sarah" width="80" height="80" />
                <p className="mb-2">
                  "Nivas made finding my perfect student accommodation so easy!"
                </p>
                <strong>- Sarah, NYU</strong>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 p-4 shadow text-center">
                <img src={micImage} className="rounded-circle mx-auto mb-3" alt="Michael" width="80" height="80" />
                <p className="mb-2">
                  "As a property owner, I love how efficiently I can connect with reliable tenants."
                </p>
                <strong>- Michael</strong>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 p-4 shadow text-center">
                <img src={emmaImage} className="rounded-circle mx-auto mb-3" alt="Emma" width="80" height="80" />
                <p className="mb-2">
                  "The real-time chat feature made communication seamless and stress-free."
                </p>
                <strong>- Emma, UCL</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white p-4">
        <div className="container text-center">
          <h4>About Us</h4>
          <p>
            Nivas is a student accommodation platform that simplifies
            housing for students and property owners using AI-powered tools.
          </p>
          <p className="mt-3 mb-0">
            &copy; 2025 Nivas. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default WelcomePage;
