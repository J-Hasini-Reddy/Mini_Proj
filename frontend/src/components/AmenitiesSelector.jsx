import React from 'react';
import { FaWifi, FaSnowflake, FaUtensils, FaShower, FaSoap } from 'react-icons/fa';
import './AmenitiesSelector.css';

const icons = {
  WiFi: <FaWifi />,
  AC: <FaSnowflake />,
  Meals: <FaUtensils />,
  'Attached Bathroom': <FaShower />,
  Laundry: <FaSoap />
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
