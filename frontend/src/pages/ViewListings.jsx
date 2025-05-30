/**
 * @file ViewListings.jsx - Component for viewing all property listings
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FaStar, FaMapMarkerAlt, FaRupeeSign, FaCheckCircle, FaUserCircle, FaBell } from 'react-icons/fa';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import './StudentHome.css';

const ViewListings = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('ownerToken');

  // Navigation items
  const navItems = [
    { href: '/owner/dashboard', icon: <FaChartBar />, text: 'Dashboard' },
    { href: '/owner/listings', icon: <FaClipboardList />, text: 'Listings' },
    { href: '/owner/add-listing', icon: <FaPlusCircle />, text: 'Add Listing' },
    { href: '/owner/inquiries', icon: <FaComments />, text: 'Inquiries' },
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(
          'http://localhost:5000/api/owner/listings',
          config
        );

        if (response.data && response.data.properties) {
          setProperties(response.data.properties);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProperties();
    }
  }, [token]);

  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="light" expand="lg" className="shadow-sm py-3">
              <Container>
                <Navbar.Brand href="/owner/home" className="d-flex align-items-center">
                            <img src={logo} alt="FindMyStay" height="60" />
                          </Navbar.Brand>
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
              </Container>
            </Navbar>
            
      <Container className="mt-5">
        <h2 className="mb-4">Your Properties</h2>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-5">
            <p>You haven't added any properties yet.</p>
            <Button variant="primary" href="/owner/add-listing">
              Add New Property
            </Button>
          </div>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {properties.map((property) => (
              <Col key={property._id}>
                <PropertyCard property={property} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default ViewListings;
