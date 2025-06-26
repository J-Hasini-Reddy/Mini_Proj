import React, { useState, useEffect } from 'react';
import { FaWifi, FaSnowflake, FaUtensils, FaShower, FaSoap, FaShieldAlt, FaParking, FaBath, FaArrowUp, FaMapMarkerAlt, FaRupeeSign, FaCheckCircle } from 'react-icons/fa';
import LocationMapInput from '../components/LocationMapInput';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewDetails.css';

const amenitiesIcons = {
  WiFi: <FaWifi className="amenity-icon" />,
  AC: <FaSnowflake className="amenity-icon" />,
  Meals: <FaUtensils className="amenity-icon" />,
  Laundry: <FaSoap className="amenity-icon" />,
  'Attached Bathroom': <FaBath className="amenity-icon" />,
  Heater: <FaShower className="amenity-icon" />,
  Security: <FaShieldAlt className="amenity-icon" />,
  Parking: <FaParking className="amenity-icon" />,
  Elevator: <FaArrowUp className="amenity-icon" />
};

const ViewDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('studentToken');

  useEffect(() => {
    if (!token || !id) return;

    const fetchListingDetails = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(
          'http://localhost:5000/api/student/profile/recommendations',
          config
        );

        const allListings = [
          ...(response.data?.topRecommendations || []),
          ...(response.data?.similarProperties || [])
        ];

        const found = allListings.find(item => item._id.toString() === id.toString());
        if (found) setListing(found);
        else throw new Error('Listing not found');
      } catch (error) {
        console.error('Error:', error);
        setListing(null);
      } finally {
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [token, id]);

  if (loading) {
    return (
      <div className="center-screen">
        <div className="loading-box">Loading listing details...</div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="center-screen">
        <div className="error-box">Listing not found or unavailable.</div>
      </div>
    );
  }

  return (
    <div className="view-details-wrapper">
      <div className="left-pane">
        <div className="property-image">
          <img src={listing.images?.[0] || require('./WelcomePage/P1.jpg')} alt="Property" />
        </div>
        <div className="property-content">
          <h2>{listing.title}</h2>
          <p><FaMapMarkerAlt className="text-info" /> {listing.address}, {listing.city}, {listing.pincode}</p>
          <p><FaRupeeSign className="text-info" /> {listing.rent} / month</p>
          <p>Room Type: {listing.roomType}</p>
          <p>Sharing: {listing.sharingType}</p>

          <h5>Amenities</h5>
          <div className="amenities-grid">
            {listing.amenities.map((item, idx) => (
              <div key={idx} className="amenity-item">
                {amenitiesIcons[item] || <FaCheckCircle className="amenity-icon" />}
                <span className="amenity-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="right-pane">
      <div style={{ marginBottom: '20px', position: 'relative', zIndex: 1 }}>
  <LocationMapInput
    location={listing.location}
    readOnly={true}
    className="mb-4"
  />
</div>

{listing.email && (
  <div className="contact-section mt-4" style={{ position: 'relative', zIndex: 2 }}>

    <h5>Contact</h5>
    <p>Email: <a href={`mailto:${listing.email}`}>{listing.email}</a></p>
  </div>
)}


      </div>
    </div>
  );
};

export default ViewDetails;
