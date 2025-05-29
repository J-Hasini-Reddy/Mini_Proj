import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Navbar, Nav, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import AmenitiesSelector from '../components/AmenitiesSelector';
import ImageUploadGrid from '../components/ImageUploadGrid';
import LocationMapInput from '../components/LocationMapInput';
import { FaBell, FaUserCircle, FaClipboardList, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import './StudentHome.css';
import { validateListing } from '../utils/formValidation';
import { showToast } from '../utils/toastUtils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// Constants for validation
const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Form field validation patterns
const fieldPatterns = {
  title: /^.{3,100}$/,
  address: /^.{3,200}$/,
  city: /^[A-Za-z\s]{2,50}$/, // 2-50 letters and spaces
  pincode: /^[0-9]{6}$/, // Exactly 6 digits
  rent: /^(\d+(\.\d{1,2})?)$/, // Numbers with optional 2 decimal places
  distance: /^(\d+(\.\d{1,2})?)$/, // Numbers with optional 2 decimal places
};

// University list for validation
const VALID_UNIVERSITIES = [
  'Bhoj Reddy Engineering College For Women',
  'JNTU Hyderabad',
  'Osmania University',
  'Vignan University',
  'VNR Vignana Jyothi Institute of Engineering & Technology',
  'K L University',
  'Sreenidhi Institute of Science and Technology'
];

const AddListing = () => {
  const navigate = useNavigate();
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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const errors = validateListing({ ...formData, [name]: value });
    setErrors(errors);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Calculate form completion percentage
  useEffect(() => {
    const requiredFields = ['title', 'address', 'city', 'pincode', 'rent', 'roomType', 'sharingType'];
    const filledFields = requiredFields.filter(field => formData[field]).length;
    setProgress(Math.round((filledFields / requiredFields.length) * 100));
  }, [formData]);

  // Auto-save form data to localStorage
  useEffect(() => {
    localStorage.setItem('listingFormData', JSON.stringify(formData));
  }, [formData]);

  // Load saved form data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('listingFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleUniversityChange = (e) => {
    const value = e.target.value;
    if (!VALID_UNIVERSITIES.includes(value)) {
      showToast('warning', 'Please select a valid university');
      return;
    }
    setFormData(prev => ({ ...prev, university: value }));
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
    setIsSubmitting(true);
    setErrors(validateListing(formData));

    if (Object.keys(errors).length > 0) {
      showToast('error', 'Please fix the highlighted errors');
      setIsSubmitting(false);
      return;
    }

    if (!location || imageFiles.length === 0) {
      showToast('error', 'Please select a location and upload at least one image');
      setIsSubmitting(false);
      return;
    }

    if (
      !Array.isArray(location) ||
      location.length !== 2 ||
      typeof location[0] !== 'number' ||
      typeof location[1] !== 'number'
    ) {
      showToast('error', 'Please select a valid location on the map');
      setIsSubmitting(false);
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
      location: location,
      distance: parseFloat(formData.distance),
      travelTime: {
        car: formData.travelTime.car || '',
        bus: formData.travelTime.bus || '',
        walk: formData.travelTime.walk || ''
      }
    };

    try {
      const token = localStorage.getItem('ownerToken');
      if (!token) {
        showToast('error', 'Authentication error. Please login again');
        setIsSubmitting(false);
        return;
      }

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
        showToast('success', 'Listing created successfully!');
        //navigate('/owner/listings');
      } else {
        showToast('error', 'Failed to create listing');
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      showToast('error', 'Server error. Please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-save form data to localStorage
  useEffect(() => {
    localStorage.setItem('listingFormData', JSON.stringify(formData));
  }, [formData]);

  // Load saved form data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('listingFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="listing-container">
      <Navbar bg="light" expand="lg" className="shadow-sm py-3">
        <Container fluid>
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
              <Nav.Link href="/owner/inquiries"> Inquiries</Nav.Link>
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
        </Container>
      </Navbar>

      <Container className="pt-5">
        <h2 className="mb-4">➕ Add New Property Listing</h2>

        <Form onSubmit={handleSubmit}>
          {/* 🏘️ Basic Info */}
          <div className="p-4 mb-4 rounded border bg-light-subtle">
            <h5>🏘️ Basic Information</h5>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Control 
                  name="title" 
                  placeholder="Listing Title" 
                  value={formData.title} 
                  onChange={handleChange}
                  isValid={errors.title === undefined}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Control 
                  name="address" 
                  placeholder="Full Address" 
                  value={formData.address} 
                  onChange={handleChange}
                  isValid={errors.address === undefined}
                  isInvalid={!!errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Control 
                  name="city" 
                  placeholder="City" 
                  value={formData.city} 
                  onChange={handleChange}
                  isValid={errors.city === undefined}
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Col>
              <Col md={4}>
                <Form.Control 
                  name="pincode" 
                  placeholder="Pincode" 
                  value={formData.pincode} 
                  onChange={handleChange}
                  isValid={errors.pincode === undefined}
                  isInvalid={!!errors.pincode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.pincode}
                </Form.Control.Feedback>
              </Col>
              <Col md={4}>
                <Form.Select 
                  name="university" 
                  value={formData.university} 
                  onChange={handleUniversityChange}
                  isValid={errors.university === undefined}
                  isInvalid={!!errors.university}
                >
                  <option value="">Nearby University</option>
                  {VALID_UNIVERSITIES.map(university => (
                    <option key={university} value={university}>
                      {university}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.university}
                </Form.Control.Feedback>
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
                <Form.Control 
                  name="rent" 
                  placeholder="Rent (₹)" 
                  value={formData.rent} 
                  onChange={handleChange}
                  isValid={errors.rent === undefined}
                  isInvalid={!!errors.rent}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.rent}
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Select 
                  name="roomType" 
                  value={formData.roomType} 
                  onChange={handleChange}
                  isValid={errors.roomType === undefined}
                  isInvalid={!!errors.roomType}
                >
                  <option value="">Room Type</option>
                  <option>Private</option>
                  <option>Shared</option>
                  <option>Studio</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.roomType}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Form.Select 
              name="sharingType" 
              className="mb-3" 
              value={formData.sharingType} 
              onChange={handleChange}
              isValid={errors.sharingType === undefined}
              isInvalid={!!errors.sharingType}
            >
              <option value="">Sharing Type</option>
              <option>Private</option>
              <option>2 Sharing</option>
              <option>3+ Sharing</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.sharingType}
            </Form.Control.Feedback>
          </div>

          {/* ✅ Amenities Section */}
          <div className="p-4 mb-4 rounded border bg-light-subtle">
            <h5>✅ Amenities Offered</h5>
            <AmenitiesSelector 
              selected={formData.amenities} 
              onToggle={handleAmenityToggle} 
            />
          </div>

          {/* 🖼️ Image Upload */}
          <div className="p-4 mb-4 rounded border bg-light-subtle">
            <h5>🖼️ Upload Images</h5>
            <ImageUploadGrid 
              images={imageFiles} 
              setImages={setImageFiles} 
            />
          </div>

          {/* 📍 Travel Distance & Time */}
          <div className="p-4 mb-4 rounded border bg-light-subtle">
            <h5>📍 Travel Time (optional override)</h5>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Control 
                  name="distance" 
                  placeholder="Distance from university (e.g. 1.2 km)" 
                  value={formData.distance} 
                  onChange={handleChange}
                  isValid={errors.distance === undefined}
                  isInvalid={!!errors.distance}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.distance}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Control 
                  placeholder="By Car (e.g. 5 min)" 
                  value={formData.travelTime.car} 
                  onChange={(e) => handleTravelTimeChange('car', e.target.value)}
                  isValid={errors.car === undefined}
                  isInvalid={!!errors.car}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.car}
                </Form.Control.Feedback>
              </Col>
              <Col md={4}>
                <Form.Control 
                  placeholder="By Bus" 
                  value={formData.travelTime.bus} 
                  onChange={(e) => handleTravelTimeChange('bus', e.target.value)}
                  isValid={errors.bus === undefined}
                  isInvalid={!!errors.bus}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.bus}
                </Form.Control.Feedback>
              </Col>
              <Col md={4}>
                <Form.Control 
                  placeholder="By Walk" 
                  value={formData.travelTime.walk} 
                  onChange={(e) => handleTravelTimeChange('walk', e.target.value)}
                  isValid={errors.walk === undefined}
                  isInvalid={!!errors.walk}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.walk}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <small className="text-muted">⚠️ Later we'll auto-fill this using location + university via OpenRouteService API.</small>
          </div>

          {/* ✅ Submit */}
          <div className="d-grid">
            <Button 
              type="submit" 
              variant="success" 
              disabled={isSubmitting || Object.keys(errors).length > 0}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Submitting...
                </>
              ) : (
                'Submit Listing'
              )}
            </Button>
          </div>
        </Form>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AddListing;