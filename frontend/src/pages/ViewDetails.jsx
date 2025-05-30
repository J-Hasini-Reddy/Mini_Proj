import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FaMapMarkerAlt, FaRupeeSign, FaCheckCircle } from 'react-icons/fa';
import LocationMapInput from '../components/LocationMapInput';
import axios from 'axios';
import './StudentHome.css';

const ViewDetails = ({ match }) => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('studentToken');

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(
          `http://localhost:5000/api/listings/${match.params.id}`,
          config
        );

        setListing(response.data);
      } catch (error) {
        console.error('Error fetching listing details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchListingDetails();
    }
  }, [token, match.params.id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading listing details...</p>
      </div>
    );
  }

  if (!listing) {
    return <div>No listing found</div>;
  }

  return (
    <Container className="py-5">
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Img variant="top" src={listing.images[0]} style={{ height: '400px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>{listing.title}</Card.Title>
              <Card.Text>
                <h5>Location Details</h5>
                <p><FaMapMarkerAlt /> {listing.address}</p>
                <p>City: {listing.city}</p>
                <p>Pincode: {listing.pincode}</p>
                <p>Distance from University: {listing.distance} km</p>
              </Card.Text>
              <Card.Text>
                <h5>Property Details</h5>
                <p>Room Type: {listing.roomType}</p>
                <p>Sharing Type: {listing.sharingType}</p>
                <p><FaRupeeSign /> Rent: ₹{listing.rent}</p>
              </Card.Text>
              <Card.Text>
                <h5>Amenities</h5>
                <ul>
                  {listing.amenities.map((amenity, index) => (
                    <li key={index}>
                      <FaCheckCircle className="text-success" /> {amenity}
                    </li>
                  ))}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <LocationMapInput
            location={listing.location}
            readOnly={true}
            className="mb-4"
          />
          <Card>
            <Card.Body>
              <Card.Title>Contact Information</Card.Title>
              <Card.Text>
                <p>Owner: {listing.ownerName}</p>
                <p>Email: {listing.ownerEmail}</p>
                <p>Phone: {listing.ownerPhone}</p>
              </Card.Text>
              <Button variant="primary" className="w-100">
                Contact Owner
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewDetails;
