import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FaStar, FaMapMarkerAlt, FaRupeeSign, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import './StudentHome.css';

const StudentRecommendations = () => {
  const [topRecommendations, setTopRecommendations] = useState([]);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('studentToken');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        // Fetch top recommendations
        const response = await axios.get(
          'http://localhost:5000/api/student/profile/recommendations',
          config
        );

        if (response.data && response.data.topRecommendations) {
          setTopRecommendations(response.data.topRecommendations);
          setSimilarProperties(response.data.similarProperties || []);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchRecommendations();
    }
  }, [token]);

  const formatDistance = (distance) => {
    if (!distance) return 'Distance not available';
    return `${distance.toFixed(1)} km`;
  };

  const formatAmenities = (amenities) => {
    if (!amenities || amenities.length === 0) return 'No amenities listed';
    return amenities.join(', ');
  };

  return (
    <div className="recommendations-page">
      <Container className="py-5">
        <h2 className="mb-4">🌟 Your Top Recommendations</h2>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3">Finding perfect matches for you...</p>
          </div>
        ) : (
          <>
            {/* Top Recommendations Section */}
            <div className="mb-5">
              <h3 className="mb-4">Top 3 Recommended Properties</h3>
              <Row xs={1} md={2} lg={3} className="g-4">
                {topRecommendations.map((listing, index) => (
                  <Col key={listing._id}>
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Title className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0">{listing.title}</h5>
                          <span className="badge bg-primary">Top {index + 1}</span>
                        </Card.Title>
                        <div className="listing-details mb-3">
                          <div className="d-flex align-items-center mb-2">
                            <FaMapMarkerAlt className="me-2" />
                            <span>{listing.address}</span>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <FaRupeeSign className="me-2" />
                            <span>₹{listing.rent}</span>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <FaStar className="me-2" />
                            <span>{formatDistance(listing.distance)}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <FaCheckCircle className="me-2" />
                            <span>{formatAmenities(listing.amenities)}</span>
                          </div>
                        </div>
                        <Button variant="success" className="w-100">
                          View Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>

            {/* Similar Properties Section */}
            {similarProperties.length > 0 && (
              <div>
                <h3 className="mb-4">More Properties You Might Like</h3>
                <Row xs={1} md={2} lg={3} className="g-4">
                  {similarProperties.map((listing) => (
                    <Col key={listing._id}>
                      <Card className="h-100">
                        <Card.Body>
                          <Card.Title>{listing.title}</Card.Title>
                          <div className="listing-details">
                            <div className="d-flex align-items-center mb-2">
                              <FaMapMarkerAlt className="me-2" />
                              <span>{listing.address}</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <FaRupeeSign className="me-2" />
                              <span>₹{listing.rent}</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <FaStar className="me-2" />
                              <span>{formatDistance(listing.distance)}</span>
                            </div>
                            <div className="d-flex align-items-center">
                              <FaCheckCircle className="me-2" />
                              <span>{formatAmenities(listing.amenities)}</span>
                            </div>
                          </div>
                          <Button variant="primary" className="w-100">
                            View Details
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default StudentRecommendations;
