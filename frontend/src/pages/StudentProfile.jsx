import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Badge, Navbar, Nav, InputGroup } from 'react-bootstrap';
import { FaBell, FaUserCircle, FaHeart, FaComments } from 'react-icons/fa';
import './StudentHome.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const StudentProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: null, 
    age: null, 
    gender: null, 
    course: null, 
    university: null, 
    email: null, // Will be set from auth token
    bio: null,
    personality: null, 
    hobbies: [], 
    entertainment: null, 
    dreamLifestyle: null, 
    roommateExpectations: null,
    cleanliness: null, 
    sleepSchedule: null, 
    noise: null, 
    food: null, 
    substanceUse: null, 
    guests: null,
    roomType: null,
    sharingType: null, 
    maxRent: null,
    maxDistance: null, 
    amenities: []
  });

  // Initialize form data with null values
  useEffect(() => {
    const initializeFormData = () => {
      // Get email from token
      const token = localStorage.getItem("studentToken");
      let email = '';
      if (token) {
        try {
          const decoded = JSON.parse(atob(token.split('.')[1]));
          email = decoded.email;
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
      
      setFormData({
        fullName: null, 
        age: null, 
        gender: null, 
        course: null, 
        university: null, 
        email: email,
        bio: null,
        personality: null, 
        hobbies: [], 
        entertainment: null, 
        dreamLifestyle: null, 
        roommateExpectations: null,
        cleanliness: null, 
        sleepSchedule: null, 
        noise: null, 
        food: null, 
        substanceUse: null, 
        guests: null,
        roomType: null,
        sharingType: null, 
        maxRent: null,
        maxDistance: null, 
        amenities: []
      });
    };
    initializeFormData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setFormData(prev => ({ ...prev, email: decoded.email }));
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const hobbiesList = ['Music', 'Sports', 'Reading', 'Gaming', 'Traveling', 'Cooking'];
  const amenitiesList = ['WiFi', 'AC', 'Meals', 'Laundry', 'Attached Bathroom', 'Heater', 'Security', 'Parking', 'Elevator' ];

  const [recommendedListings, setRecommendedListings] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("studentToken");
        if (!token) {
          console.warn("No token found — redirecting to login");
          window.location.href = '/student/login';
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        // First fetch profile
        const profileResponse = await axios.get(
          "http://localhost:5000/api/student/profile/",
          config
        );

        // If profile exists, update form data
        if (profileResponse.data) {
          setFormData(prev => ({ ...prev, ...profileResponse.data }));
        }
        // If no profile exists, just continue with empty form
        else {
          console.log('No existing profile found - starting fresh');
        }

        // Then fetch recommendations
        try {
          const recommendResponse = await axios.post(
            "http://localhost:5000/api/recommend/",
            profileResponse.data,
            config
          );

          if (recommendResponse.data) {
            console.log("Top 3 recommended listings:", recommendResponse.data);
            setRecommendedListings(recommendResponse.data);
          }
        } catch (recommendError) {
          console.error("Recommendation API error:", recommendError);
          // Don't show error to user if profile was loaded successfully
        }
      } catch (error) {
        console.error("API Error:", error);
        if (error.response?.status === 401) {
          // Clear token and redirect to login if unauthorized
          localStorage.removeItem("studentToken");
          window.location.href = '/student/login';
        } else if (error.response?.status === 404) {
          // If profile not found, just continue with empty form
          console.log('No existing profile found - starting fresh');
        } else {
          // Handle other errors
          alert("Failed to load profile. Please try again.");
        }
      }
    };

    fetchProfile();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => {
      const values = prev[field];
      return {
        ...prev,
        [field]: values.includes(value) ? values.filter(v => v !== value) : [...values, value]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("studentToken");
      console.log('Token:', token);
      if (!token) {
        alert("You must be logged in to submit your profile.");
        return;
      }

      // Add loading state
      setFormData(prev => ({ ...prev, isLoading: true }));

      // Validate required fields
      const requiredFields = ['fullName', 'email', 'course', 'university'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
        setFormData(prev => ({ ...prev, isLoading: false }));
        return;
      }

      // Format the data before sending
      const formattedData = {
        ...formData,
        // Ensure email is lowercase
        email: formData.email?.toLowerCase() || '',
        // Format gender to match schema
        gender: formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1).toLowerCase() : '',
        // Convert age to number if it's a string
        age: formData.age ? Number(formData.age) : null,
        // Set default values for required fields
        cleanliness: formData.cleanliness || 'Clean',
        noise: formData.noise || 'Moderate',
        food: formData.food || '',
        substanceUse: formData.substanceUse || 'No',
        guests: formData.guests || 'No'
      };

      // Remove null values but keep required fields
      const cleanedData = Object.fromEntries(
        Object.entries(formattedData).filter(([key, value]) => {
          // Always keep required fields
          const requiredFields = ['fullName', 'email', 'course', 'university', 'cleanliness', 'noise', 'substanceUse', 'guests'];
          return value !== null || requiredFields.includes(key);
        })
      );

      console.log('Form data being sent:', formattedData);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/student/profile/",
          formattedData,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        // Remove loading state
        setFormData(prev => ({ ...prev, isLoading: false }));
        console.log('API Response:', response);
        console.log('Response data:', response.data);
        console.log('Response status:', response.status);

        if (response.status === 200 && response.data && response.data.message === 'Profile saved') {
          console.log('Success case triggered');
          // Success message before redirect
          alert("Profile saved successfully! Redirecting to recommendations...");
          // Redirect to StudentHome with scroll behavior
          navigate('/student/home', { 
            state: { 
              scrollPosition: window.scrollY 
            }
          }, { replace: true });
        } else {
          console.error('Unexpected response:', response);
          alert('Failed to save profile. Please try again.');
        }
      } catch (error) {
        console.error('Error saving profile:', error);
        console.error('Error details:', error.response?.data);
        console.error('Response data:', error.response?.data);
        
        // Remove loading state
        setFormData(prev => ({ ...prev, isLoading: false }));
        
        if (error.response) {
          // Server responded with an error
          alert(error.response.data?.message || 'Failed to save profile. Please try again.');
        } else {
          // Network error or other issue
          alert('Failed to connect to server. Please check your internet connection and try again.');
        }
        return;
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      if (error.response) {
        console.error('Response data:', error.response.data);
        if (error.response.data && error.response.data.message) {
          alert(`Error: ${error.response.data.message}`);
        } else {
          alert(`Error: ${error.response.status} - ${error.response.statusText}`);
        }
      } else if (error.message) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };


  return (
    <div className="student-profile">
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="shadow-sm py-3">
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-4 text-primary">FindMyStay</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="align-items-center gap-4">
              <Nav.Link href="/connect"><FaComments /> Connect</Nav.Link>
              <Nav.Link href="/favorites"><FaHeart /> Favorites</Nav.Link>
              <Nav.Link href="/profile"><FaUserCircle /> Profile</Nav.Link>
              <Nav.Link href="/notifications"><FaBell size={20} /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-5">
        <h2 className="mb-4">🧑 Student Profile</h2>

        {/* Avatar */}
        <div className="mb-4 d-flex align-items-center gap-3">
          <div className="avatar bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center fs-2" style={{ width: 80, height: 80 }}>
            {formData.fullName ? formData.fullName.split(' ').map(w => w[0]).join('') : '👤'}
          </div>
          <div className="text-muted">This avatar will be shown in Roommate Picks.</div>
        </div>

        <Form onSubmit={handleSubmit}>
          {/* Section 1: Basic Info */}
          <div className="p-4 mb-4 rounded border bg-light-subtle">
            <h5>📘 Basic Info</h5>
            <Row className="mb-3">
              <Col md={6}><Form.Control name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} /></Col>
              <Col md={6}><Form.Control name="age" placeholder="Age" type="number" value={formData.age} onChange={handleChange} /></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other / Prefer not to say</option>
              </Form.Select></Col>
              <Col md={6}><Form.Control name="course" placeholder="Course" value={formData.course} onChange={handleChange} /></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Control name="university" placeholder="University" value={formData.university} onChange={handleChange} /></Col>
              <Col md={6}><Form.Control name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} /></Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Control as="textarea" name="bio" placeholder="Brief Bio" rows={2} value={formData.bio} onChange={handleChange} />
            </Form.Group>
          </div>

          {/* Section 2: Personality & Interests */}
          <div className="p-4 mb-4 rounded border bg-light-subtle">
            <h5>🎯 Personality & Interests</h5>
            <Form.Group className="mb-3">
              <Form.Select name="personality" value={formData.personality} onChange={handleChange}>
                <option value="">Select Personality</option>
                <option>Friendly</option>
                <option>Introvert</option>
                <option>Balanced</option>
                <option>Chill</option>
              </Form.Select>
            </Form.Group>
            <div className="mb-3">
              <strong>Select your hobbies:</strong>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {hobbiesList.map(hobby => (
                  <Badge
                    key={hobby}
                    bg={formData.hobbies.includes(hobby) ? 'primary' : 'secondary'}
                    onClick={() => handleMultiSelect('hobbies', hobby)}
                    style={{ cursor: 'pointer', fontSize: '1rem', padding: '0.6em 1em' }}
                  >
                    {hobby}
                  </Badge>
                ))}
              </div>
            </div>
            <Form.Control as="textarea" name="entertainment" placeholder="Entertainment preferences" rows={2} className="mb-3" value={formData.entertainment} onChange={handleChange} />
            <Form.Control as="textarea" name="dreamLifestyle" placeholder="Dream lifestyle or vacation" rows={2} className="mb-3" value={formData.dreamLifestyle} onChange={handleChange} />
            <Form.Control as="textarea" name="roommateExpectations" placeholder="Roommate expectations" rows={2} className="mb-4" value={formData.roommateExpectations} onChange={handleChange} />
          </div>

          {/* Section 3: Lifestyle */}
          <div className="p-4 mb-4 rounded border bg-light-subtle">
            <h5>🛏️ Lifestyle Preferences</h5>
            <Row className="mb-3">
              <Col md={6}><Form.Select name="cleanliness" value={formData.cleanliness} onChange={handleChange}>
                <option value="">Cleanliness</option>
                <option>Neat</option>
                <option>Moderate</option>
                <option>Messy</option>
              </Form.Select></Col>
              <Col md={6}><Form.Select name="sleepSchedule" value={formData.sleepSchedule} onChange={handleChange}>
                <option value="">Sleep Schedule</option>
                <option>Early Bird</option>
                <option>Night Owl</option>
              </Form.Select></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Select name="noise" value={formData.noise} onChange={handleChange}>
                <option value="">Noise Preference</option>
                <option>Quiet</option>
                <option>Moderate</option>
                <option>Loud</option>
              </Form.Select></Col>
              <Col md={6}><Form.Select name="food" value={formData.food} onChange={handleChange}>
                <option value="">Dietary Preference</option>
                <option>Vegetarian</option>
                <option>Vegan</option>
                <option>Non-Vegetarian</option>
                <option>Allergies</option>
              </Form.Select></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Select name="substanceUse" value={formData.substanceUse} onChange={handleChange}>
                <option value="">Alcohol/Smoking</option>
                <option>No Tolerance</option>
                <option>Occasional OK</option>
                <option>No Preference</option>
              </Form.Select></Col>
              <Col md={6}><Form.Select name="guests" value={formData.guests} onChange={handleChange}>
                <option value="">Guests Policy</option>
                <option>Yes</option>
                <option>Sometimes</option>
                <option>No</option>
              </Form.Select></Col>
            </Row>
          </div>

          {/* Section 4: Room Preferences */}
          <div className="p-4 mb-4 rounded border bg-light-subtle">
            <h5>📌 Room Preferences</h5>
            <Row className="mb-3">
              <Col md={6}><Form.Select name="roomType" value={formData.roomType} onChange={handleChange}>
                <option value="">Room Type</option>
                <option>Private</option>
                <option>Shared</option>
                <option>Studio</option>
              </Form.Select></Col>
              <Col md={6}><Form.Select name="sharingType" value={formData.sharingType} onChange={handleChange}>
              <option value="">Sharing Type</option>
              <option>Private</option>
              <option>2 Sharing</option>
              <option>3+ Sharing</option>
            </Form.Select></Col></Row>
            <Row className="mb-3">
              <Col md={6}><Form.Control name="maxRent" placeholder="Max Rent ₹" value={formData.maxRent} onChange={handleChange} /></Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
             <Form.Control
              name="maxDistance"
              placeholder="Max Distance to University (in km)"
              value={formData.maxDistance}
              onChange={handleChange}
             />
             </Col>
          </Row>

            <div className="mb-4">
              <strong>Select preferred amenities:</strong>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {amenitiesList.map(item => (
                  <Badge
                    key={item}
                    bg={formData.amenities.includes(item) ? 'success' : 'secondary'}
                    onClick={() => handleMultiSelect('amenities', item)}
                    style={{ cursor: 'pointer', fontSize: '1rem', padding: '0.6em 1em' }}
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="d-grid">
                        <Button type="submit" variant="success">Save Profile</Button>
      </div>
    </Form>

  </Container>
</div> 
  );
};

export default StudentProfile;