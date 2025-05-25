
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Navbar, Nav, Dropdown } from 'react-bootstrap';
import AmenitiesSelector from '../components/AmenitiesSelector';
import ImageUploadGrid from '../components/ImageUploadGrid';
import LocationMapInput from '../components/LocationMapInput';
import { FaBell, FaUserCircle, FaClipboardList } from 'react-icons/fa';
import axios from 'axios';
import './StudentHome.css';

const AddListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    pincode: '',
    university: '',
    rent: '',
    roomType: '',
    sharingType: '',
    amenities: [],
    images: [],
    distance: '',
    travelTime: {
      car: '',
      bus: '',
      walk: ''
    }
  });

  const [location, setLocation] = useState(null); // [lat, lng]
  const [imageFiles, setImageFiles] = useState([]); // Will be [{ url, public_id }]

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTravelTimeChange = (mode, value) => {
    setFormData(prev => ({
      ...prev,
      travelTime: {
        ...prev.travelTime,
        [mode]: value
      }
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => {
      const selected = prev.amenities;
      return {
        ...prev,
        amenities: selected.includes(amenity)
          ? selected.filter(a => a !== amenity)
          : [...selected, amenity]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('ownerToken');
    if (!token) {
      alert('Authentication error. Please login again.');
      return;
    }

    if (!location || imageFiles.length === 0) {
      alert('Please select a location and upload at least one image.');
      return;
    }

    if (
      !Array.isArray(location) ||
      location.length !== 2 ||
      typeof location[0] !== 'number' ||
      typeof location[1] !== 'number'
    ) {
      console.log("❌ Invalid location object:", location);
      alert("Please select a valid location on the map.");
      return;
    }

    const listingData = {
      title: formData.title,
      address: formData.address,
      city: formData.city,
      pincode: Number(formData.pincode),
      university: formData.university,
      rent: Number(formData.rent),
      roomType: formData.roomType,
      sharingType: formData.sharingType,
      amenities: formData.amenities,
      images: imageFiles.map(img => ({
        url: img.url,
        public_id: img.public_id
      })),
      location: location, // Send as [lat, lng] array directly
      distance: parseFloat(formData.distance),
      travelTime: {
        car: formData.travelTime.car || '',
        bus: formData.travelTime.bus || '',
        walk: formData.travelTime.walk || ''
      }
    };

    console.log("📦 Submitting listingData:", listingData); // Debug

    try {
      const res = await axios.post(
        'http://localhost:5000/api/owner/add-listing',
        listingData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        alert('✅ Listing created successfully!');
      } else {
        alert('⚠️ Failed to create listing.');
      }
    } catch (err) {
      console.error("❌ Error details:", err.response?.data || err.message);
      alert('❌ Server error. Please try again.');
    }
  };

  return (
    <Container className="pt-5">
      <Navbar bg="light" expand="lg" className="shadow-sm py-3">
        <Navbar.Brand href="/owner/home" className="fw-bold fs-4 text-primary">FindMyStay</Navbar.Brand>
        <Navbar.Toggle aria-controls="owner-navbar" />
        <Navbar.Collapse id="owner-navbar" className="justify-content-end">
          <Nav className="align-items-center gap-4">
            <Dropdown>
              <Dropdown.Toggle variant="light" className="fw-semibold">
                <FaClipboardList /> My Listings
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/owner/listings">View Listings</Dropdown.Item>
                <Dropdown.Item href="/owner/add-listing">Add New Listing</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Link href="/owner/inquiries">💬 Inquiries</Nav.Link>
            <Dropdown>
              <Dropdown.Toggle variant="light" className="fw-semibold">
                <FaUserCircle /> Profile
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/owner/profile">Edit Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/logout">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Link href="/owner/notifications"><FaBell size={20} /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <h2 className="mb-4">➕ Add New Property Listing</h2>

      <Form onSubmit={handleSubmit}>
        {/* 🏘️ Basic Info */}
        <div className="p-4 mb-4 rounded border bg-light-subtle">
          <h5>🏘️ Basic Information</h5>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Control name="title" placeholder="Listing Title" value={formData.title} onChange={handleChange} />
            </Col>
            <Col md={6}>
              <Form.Control name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Control name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            </Col>
            <Col md={4}>
              <Form.Control name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
            </Col>
            <Col md={4}>
              <Form.Control name="university" placeholder="Nearby University" value={formData.university} onChange={handleChange} />
            </Col>
          </Row>
        </div>

        {/* 🗺️ Location Section */}
        <div className="p-4 mb-4 rounded border bg-light-subtle">
          <h5>🗺️ Select Location on Map</h5>
          <LocationMapInput location={location} setLocation={setLocation} />
        </div>

        {/* 💰 Rent & Room Details */}
        <div className="p-4 mb-4 rounded border bg-light-subtle">
          <h5>💰 Rent & Room Details</h5>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Control name="rent" placeholder="Rent (₹)" value={formData.rent} onChange={handleChange} />
            </Col>
            <Col md={6}>
              <Form.Select name="roomType" value={formData.roomType} onChange={handleChange}>
                <option value="">Room Type</option>
                <option>Private</option>
                <option>Shared</option>
                <option>Studio</option>
              </Form.Select>
            </Col>
          </Row>
          <Form.Select name="sharingType" className="mb-3" value={formData.sharingType} onChange={handleChange}>
            <option value="">Sharing Type</option>
            <option>Private</option>
            <option>2 Sharing</option>
            <option>3+ Sharing</option>
          </Form.Select>
        </div>

        {/* ✅ Amenities Section */}
        <div className="p-4 mb-4 rounded border bg-light-subtle">
          <h5>✅ Amenities Offered</h5>
          <AmenitiesSelector selected={formData.amenities} onToggle={handleAmenityToggle} />
        </div>

        {/* 🖼️ Image Upload */}
        <div className="p-4 mb-4 rounded border bg-light-subtle">
          <h5>🖼️ Upload Images</h5>
          <ImageUploadGrid images={imageFiles} setImages={setImageFiles} />
        </div>

        {/* 📍 Travel Distance & Time */}
        <div className="p-4 mb-4 rounded border bg-light-subtle">
          <h5>📍 Travel Time (optional override)</h5>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Control name="distance" placeholder="Distance from university (e.g. 1.2 km)" value={formData.distance} onChange={handleChange} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Control placeholder="By Car (e.g. 5 min)" value={formData.travelTime.car} onChange={(e) => handleTravelTimeChange('car', e.target.value)} />
            </Col>
            <Col md={4}>
              <Form.Control placeholder="By Bus" value={formData.travelTime.bus} onChange={(e) => handleTravelTimeChange('bus', e.target.value)} />
            </Col>
            <Col md={4}>
              <Form.Control placeholder="By Walk" value={formData.travelTime.walk} onChange={(e) => handleTravelTimeChange('walk', e.target.value)} />
            </Col>
          </Row>
          <small className="text-muted">⚠️ Later we'll auto-fill this using location + university via OpenRouteService API.</small>
        </div>

        {/* ✅ Submit */}
        <div className="d-grid">
          <Button type="submit" variant="success">Submit Listing</Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddListing;