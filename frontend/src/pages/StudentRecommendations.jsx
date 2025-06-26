/**
 * @file StudentRecommendations.jsx - Component for displaying roommate recommendations
 */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Link } from 'react-bootstrap';
import { FaStar, FaMapMarkerAlt, FaRupeeSign, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import './StudentHome.css';
import { Link as RouterLink } from 'react-router-dom';

// Using inline styles for images
const images = {
  P1: require('./WelcomePage/P1.jpg'),
  P2: require('./WelcomePage/P2.jpg'),
  P3: require('./WelcomePage/P3.jpg'),
  P4: require('./WelcomePage/P4.jpg'),
  P5: require('./WelcomePage/P5.jpg')
};

// Add this style to StudentHome.css
const imageStyles = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '8px 8px 0 0'
};

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
                      <div style={{
                        ...imageStyles,
                        backgroundImage: `url(${listing.images[0] || (
                          index === 0 ? images.P1 :
                          index === 1 ? images.P2 :
                          index === 2 ? images.P3 :
                          index === 3 ? images.P4 :
                          images.P5
                        )})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                      />
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
                        </div>
                        <div className="amenities-section mb-3">
                          <h5>Amenities</h5>
                          <ul>
                            {listing.amenities.map((amenity, index) => (
                              <li key={index}>
                                <FaCheckCircle className="text-success" /> {amenity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Card.Body>
                      <Card.Footer className="text-center">
                        <Button variant="primary" 
                                as={RouterLink} 
                                to={`/view-details/${listing._id}`}
                                className="w-100">
                          View Details
                        </Button>
                      </Card.Footer>
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
                  {similarProperties.map((listing, index) => (
                    <Col key={listing._id}>
                      <Card className="h-100">
                        <div style={{
                          ...imageStyles,
                          backgroundImage: `url(${index % 2 === 0 ? images.P4 : images.P5})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                        />
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
                          </div>
                          <Card.Footer className="text-center">
                            <Button variant="primary" 
                                    as={RouterLink} 
                                    to={`/view-details/${listing._id}`}
                                    className="w-100">
                              View Details
                            </Button>
                          </Card.Footer>
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
