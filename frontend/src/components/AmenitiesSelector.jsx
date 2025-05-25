import React from 'react';
import {
  FaWifi,
  FaSnowflake,
  FaUtensils,
  FaShower,
  FaSoap,
  FaShieldAlt,
  FaParking,
  FaBath,
  FaArrowUp
} from 'react-icons/fa';
import './AmenitiesSelector.css';

const icons = {
  WiFi: <FaWifi />,
  AC: <FaSnowflake />,
  Meals: <FaUtensils />,
  Laundry: <FaSoap />,
  'Attached Bathroom': <FaBath />,
  Heater: <FaShower />,
  Security: <FaShieldAlt />,
  Parking: <FaParking />,
  Elevator: <FaArrowUp />
};

const AmenitiesSelector = ({ selected, onToggle }) => {
  return (
    <div className="amenities-grid">
      {Object.keys(icons).map((amenity) => (
        <div
          key={amenity}
          className={`amenity-icon ${selected.includes(amenity) ? 'selected' : ''}`}
          onClick={() => onToggle(amenity)}
          title={amenity}
        >
          {icons[amenity]}
          <small>{amenity}</small>
        </div>
      ))}
    </div>
  );
};

export default AmenitiesSelector;
