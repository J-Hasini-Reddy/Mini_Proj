import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Badge, Navbar, Nav, InputGroup } from 'react-bootstrap';
import { FaBell, FaUserCircle, FaHeart, FaComments } from 'react-icons/fa';
import './StudentHome.css';

const StudentProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '', age: '', gender: '', course: '', university: '', email: '', bio: '',
    personality: '', hobbies: [], entertainment: '', dreamLifestyle: '', roommateExpectations: '',
    cleanliness: '', sleepSchedule: '', noise: '', food: '', substanceUse: '', guests: '',
    roomType: '', maxRent: '', amenities: []
  });

  const hobbiesList = ['Music', 'Sports', 'Reading', 'Gaming', 'Traveling', 'Cooking'];
  const amenitiesList = ['WiFi', 'AC', 'Meals', 'Laundry', 'Attached Bathroom'];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
              <Col md={6}><Form.Control name="maxRent" placeholder="Max Rent ₹" value={formData.maxRent} onChange={handleChange} /></Col>
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

