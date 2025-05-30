/**
 * @file StudentHome.jsx - Main dashboard component for student users
 */
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Navbar, Nav, Button, Form, InputGroup, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaBell, FaUserCircle, FaHeart, FaComments, FaSearch, FaStar, FaBus, FaCar, FaWalking, FaWifi, FaSnowflake, FaUtensils, FaBed, FaShower, FaMars, FaVenus, FaGenderless } from 'react-icons/fa';
import './StudentHome.css';
import '../styles/NavbarStyles.css';
import homeBackImage from './WelcomePage/home_back.jpg';
import logo from './WelcomePage/logo_b.png';
import PropertyCard from '../components/PropertyCard';
import RoommateCard from '../components/RoommateCard';

const StudentHome = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState('stays');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const justForYouRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        console.log('Attempting to fetch recommendations...');
        const token = localStorage.getItem('studentToken');
        if (!token) {
          console.error('No token found');
          // Redirect to login if no token
          window.location.href = '/student/login';
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        // First fetch student profile
        const profileResponse = await axios.get(
          'http://localhost:5000/api/student/profile',
          config
        );
        
        if (!profileResponse.data || !profileResponse.data.university) {
          console.error('No university found in profile:', profileResponse.data);
          return;
        }

        // Now make the recommendation request
        const response = await axios.post(
          'http://localhost:5000/api/recommend',
          { university: profileResponse.data.university },
          config
        );

        // Process the response to add additional fields
        const processedProperties = response.data.map((property, index) => ({
          ...property,
          title: property.title || `Property ${index + 1}`,
          address: property.address || 'Near Campus',
          distance: property.distance || '0.5',
          travelTimes: {
            car: '5 min',
            bus: '10 min',
            walk: '15 min'
          },
          roomType: property.roomType || 'Single',
          sharing: property.sharingType || 'Private',
          amenities: property.amenities || ['WiFi', 'AC'],
          price: property.rent || '₹10,000/mo',
          images: property.images || ['/img/property-default.jpg'],
          bestPick: index < 3,
          rating: 4.5
        }));

        console.log('API Response:', response.data);
        if (processedProperties && Array.isArray(processedProperties)) {
          setProperties(processedProperties);
          console.log('Set properties:', processedProperties);
        } else {
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        // Redirect to login on 401 error
        if (error.response?.status === 401) {
          window.location.href = '/student/login';
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  useEffect(() => {
    if (location.state?.scrollToJustForYou && justForYouRef.current) {
      justForYouRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);


  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    // Delay to allow click event on suggestions
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="student-home">
      {/* Combined Navbar and Hero Section */}
      <div className="hero-container" style={{
        backgroundImage: `url(${homeBackImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '80vh'
      }}>
        {/* Navbar */}
        <Navbar bg="light" expand="lg" className="shadow-none py-3">
          <Container>
            <Navbar.Brand href="/" className="d-flex align-items-center">
              <img src={logo} alt="FindMyStay" height="60" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="align-items-center gap-4">
                <Nav.Link href="/connect" className="d-flex align-items-center gap-1">
                  <FaComments /> Connect
                </Nav.Link>
                <Nav.Link href="/favorites" className="d-flex align-items-center gap-1">
                  <FaHeart /> Favorites
                </Nav.Link>
                <Nav.Link href="/profile" className="d-flex align-items-center gap-1">
                  <FaUserCircle /> Profile
                </Nav.Link>
                <Nav.Link href="/notifications">
                  <FaBell size={20} />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Hero Section */}
        <div className="hero-section d-flex align-items-center text-white">
        <Container>
          <div className="row">
            <div className="col">
              <h1 className="display-5 fw-bold">Home away from home</h1>
              <p className="lead mb-4">Book student accommodations near top universities and cities across the globe.</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="search-wrapper position-relative mt-4">
                <InputGroup className="search-bar shadow-sm rounded">
                  <Form.Control
                    placeholder="Search by city, university or property..."
                    aria-label="Search"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <Button variant="primary">
                    <FaSearch />
                  </Button>
                </InputGroup>

                {showSuggestions && (
                  <div className="suggestion-box position-absolute bg-white p-3 shadow rounded w-100 mt-1 z-3">
                    <div className="mb-2">
                      <strong className="text-muted">🏙️ Top Cities</strong>
                      <div className="d-flex flex-wrap gap-3 mt-2">
                        {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'].map(city => (
                          <div key={city} className="suggestion-item text-primary fw-medium cursor-pointer">{city}</div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3">
                      <strong className="text-muted">🎓 Top Universities</strong>
                      <div className="d-flex flex-wrap gap-3 mt-2">
                        {['IIT Bombay', 'IIT Delhi', 'IIT Madras', 'BITS Pilani', 'NIT Trichy', 'Anna University', 'Jadavpur University', 'University of Hyderabad'].map(university => (
                          <div key={university} className="suggestion-item text-primary fw-medium cursor-pointer">{university}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
      </div>

      {/* Toggle Section for Smart Stays and Roommate Picks */}
      <Container className="mt-5" ref={justForYouRef}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-semibold">Just for You</h3>
          <div className="btn-group">
            <Button
              variant={activeTab === 'stays' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveTab('stays')}
            >
              🏠 Smart Stays
            </Button>
            <Button
              variant={activeTab === 'roommates' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveTab('roommates')}
            >
              👯‍♂️ Roommate Picks
            </Button>
          </div>
        </div>

          {/* Property Cards Section */}
          
          {activeTab === 'stays' && (
            <>
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <Row>
                  {properties.map(property => (
                    <Col key={property.id} md={12}>
                      <PropertyCard property={property} />
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}

        {activeTab === 'roommates' && (
          <Row>
            {properties.map((property) => (
              <Col key={property.id} md={12}>
                <RoommateCard roommate={property} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default StudentHome;