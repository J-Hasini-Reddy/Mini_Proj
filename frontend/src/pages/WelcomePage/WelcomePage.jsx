import "bootstrap/dist/css/bootstrap.min.css";
import "./WelcomePage.css";
import houseImage from './house.jpg';
import aiRecImage from './ai rec.png';
import realChatImage from './real.png';
import rentImage from './rent.png';
import saraImage from './sara.jpg';
import micImage from './mic.jpg';
import emmaImage from './emma.png';

function WelcomePage() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="#home">
            StaySmart
          </a>
          <div className="mx-auto">
            <ul className="navbar-nav flex-row">
              <li className="nav-item px-3">
                <a className="nav-link fw-bold" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link fw-bold" href="#whychoose">
                  Why Choose Us
                </a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link fw-bold" href="#testimonials">
                  Testimonials
                </a>
              </li>
              <li className="nav-item px-3">
                <button className="btn btn-outline-primary me-2">Login</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-primary">Register</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {/* Hero Section */}
      <section
        id="home"
        className="vh-100 d-flex align-items-center"
        style={{
          backgroundImage: `url(${houseImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: "70px",
        }}
      >
        <div className="container">
          <div className="row text-white">
            <div className="col-md-6">
              <h2>Search, explore and book your room!</h2>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by city, university or place"
              />
              <button className="btn btn-light">Find Rooms</button>
            </div>
            <div className="col-md-6 text-end">
              <h2>List your property. Find tenants fast.</h2>
              <p>Join thousands of property owners who trust StaySmart.</p>
              <button className="btn btn-light">Post a Property</button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="whychoose" className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="text-primary border-bottom pb-2 d-inline-block">
            Why Choose Us?
          </h2>
          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow">
                <img
                  src={aiRecImage}
                  className="card-img-top p-4"
                  alt="recommendations"
                />
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
                <img src={realChatImage} className="card-img-top p-4" alt="chat" />
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
                <img
                  src={rentImage}
                  className="card-img-top p-4"
                  alt="pricing"
                />
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
      <section id="testimonials" className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-5 text-primary border-bottom d-inline-block pb-2">
            What Our Users Say
          </h2>
          <div className="row justify-content-center">
            {/* Testimonial 1 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 p-4 shadow text-center">
                <img
                  src={saraImage}
                  className="rounded-circle mx-auto mb-3"
                  alt="Sarah"
                  width="80"
                  height="80"
                  style={{ objectFit: "cover" }}
                />
                <p className="mb-2">
                  "StaySmart made finding my perfect student accommodation so
                  easy!"
                </p>
                <strong>- Sarah, NYU</strong>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 p-4 shadow text-center">
                <img
                  src={micImage}
                  className="rounded-circle mx-auto mb-3"
                  alt="Michael"
                  width="80"
                  height="80"
                  style={{ objectFit: "cover" }}
                />
                <p className="mb-2">
                  "As a property owner, I love how efficiently I can connect
                  with reliable tenants."
                </p>
                <strong>- Michael</strong>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 p-4 shadow text-center">
                <img
                  src={emmaImage}
                  className="rounded-circle mx-auto mb-3"
                  alt="Emma"
                  width="80"
                  height="80"
                  style={{ objectFit: "cover" }}
                />
                <p className="mb-2">
                  "The real-time chat feature made communication seamless and
                  stress-free."
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
            StaySmart is a student accommodation platform that simplifies
            housing for students and property owners using AI-powered tools.
          </p>
          <p className="mt-3 mb-0">
            &copy; 2025 StaySmart. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default WelcomePage;