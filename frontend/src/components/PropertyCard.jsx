/**
 * @file PropertyCard.jsx - Component for displaying property listings
 */
import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { 
  FaStar, 
  FaBus, 
  FaCar, 
  FaWalking, 
  FaWifi, 
  FaSnowflake, 
  FaUtensils, 
  FaBed, 
  FaShower, 
  FaMapMarkerAlt, 
  FaClock, 
  FaRupeeSign,
  FaParking,
  FaShieldAlt,
  FaBuilding
} from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  // Map amenities to icons
  const amenityIcons = {
    'WiFi': <FaWifi className="me-1" />,
    'AC': <FaSnowflake className="me-1" />,
    'Meals': <FaUtensils className="me-1" />,
    'Laundry': <FaBed className="me-1" />,
    'Attached Bathroom': <FaShower className="me-1" />,
    'Heater': <FaSnowflake className="me-1" />,
    'Security': <FaShieldAlt className="me-1" />,
    'Parking': <FaParking className="me-1" />,
    'Elevator': <FaBuilding className="me-1" />
  };

  return (
    <Card className="mb-4 shadow-sm property-card">
      {/* Images */}
      <div className="position-relative">
        {property.images && property.images.length > 0 && (
          <img
            src={typeof property.images[0] === 'object' ? property.images[0].url : property.images[0]}
            className="card-img-top"
            alt={property.title}
            style={{ 
              height: '200px', 
              objectFit: 'cover',
              width: '100%'
            }}
          />
        )}
        {property.bestPick && (
          <Badge bg="success" className="position-absolute top-0 start-0 m-2">
            Best Pick
          </Badge>
        )}
      </div>

      <Card.Body>
        {/* Title */}
        <h5 className="card-title mb-2">{property.title}</h5>

        {/* Address and Distance */}
        <div className="d-flex align-items-center mb-3 text-muted">
          <FaMapMarkerAlt className="me-1" />
          <span>{property.address}</span>
          <span className="mx-2">•</span>
          <span>{property.distance} km away</span>
        </div>

        {/* Room Type and Sharing */}
        <div className="d-flex gap-2 mb-3">
          <Badge bg="primary" text="white">
            <FaBed className="me-1" />{property.roomType}
          </Badge>
          <Badge bg="secondary" text="white">
            {property.sharing}
          </Badge>
        </div>

        {/* Amenities */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          {property.amenities.map((amenity, index) => (
            <Badge key={index} bg="light" text="dark" className="d-flex align-items-center">
              {amenityIcons[amenity]}
              {amenity}
            </Badge>
          ))}
        </div>

        {/* Price */}
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <FaRupeeSign className="me-1" />
            {property.price}
          </h5>
          <Button variant="primary">View Details</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
