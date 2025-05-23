import React from 'react';
import { Container, Navbar, Nav, Dropdown, Button, Row, Col, Card } from 'react-bootstrap';
import { FaBell, FaUserCircle, FaClipboardList, FaChartBar, FaPlusCircle } from 'react-icons/fa';
import './StudentHome.css'; // for shared styles

const mockListings = [
  {
    id: 1,
    title: '1 BHK near IIT Bombay',
    location: 'Powai, Mumbai',
    price: '₹14,000/mo'
  },
  {
    id: 2,
    title: '2 Sharing Room in Delhi',
    location: 'North Campus, Delhi',
    price: '₹9,000/mo'
  }
];

const OwnerDashboard = () => {
  return (
    <div className="owner-dashboard">
      {/* ✅ Navbar */}
      <Navbar bg="light" expand="lg" className="shadow-sm py-3">
        <Container>
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
        </Container>
      </Navbar>

      {/* ✅ Welcome Banner */}
      <Container className="mt-5">
        <div className="mb-4">
          <h3 className="fw-semibold">Welcome back, Owner!</h3>
          <p className="text-muted">Here’s what’s happening on your properties today.</p>
        </div>

        {/* ✅ Quick Stats Section */}
        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-center p-3 shadow-sm">
              <FaChartBar className="fs-2 text-primary mb-2" />
              <h5>2 Active Listings</h5>
              <p className="text-muted">Total Properties</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center p-3 shadow-sm">
              <FaChartBar className="fs-2 text-success mb-2" />
              <h5>5 Inquiries</h5>
              <p className="text-muted">This Week</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center p-3 shadow-sm">
              <FaChartBar className="fs-2 text-warning mb-2" />
              <h5>120 Views</h5>
              <p className="text-muted">Total this Month</p>
            </Card>
          </Col>
        </Row>

        {/* ✅ Listings Preview */}
        <h5 className="mb-3">📋 Your Listings</h5>
        <Row className="mb-4">
          {mockListings.map(listing => (
            <Col md={6} key={listing.id}>
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title>{listing.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{listing.location}</Card.Subtitle>
                  <Card.Text><strong>{listing.price}</strong></Card.Text>
                  <Button size="sm" variant="outline-primary" href={`/owner/edit-listing/${listing.id}`}>Edit</Button>{' '}
                  <Button size="sm" variant="outline-danger">Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* ✅ Add Property CTA */}
        <div className="text-center mb-5">
          <Button href="/owner/add-listing" variant="primary" size="lg">
            <FaPlusCircle className="me-2" /> Add New Property
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default OwnerDashboard;
