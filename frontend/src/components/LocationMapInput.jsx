/**
 * @file LocationMapInput.jsx - Component for property location selection
 */
import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LocationPicker = ({ location, setLocation }) => {
  useMapEvents({
    click(e) {
      const coords = [e.latlng.lat, e.latlng.lng];
      console.log("Selected location:", coords);  // ✅ Add this
      setLocation(coords);
    }
  });

  return location ? <Marker position={location} /> : null;
};


const LocationMapInput = ({ location, setLocation }) => {
  return (
    <div>
      <p>Click on the map to select your property location:</p>
      <MapContainer center={[17.385044, 78.486671]} zoom={10} style={{ height: '300px', width: '100%' }}>

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationPicker location={location} setLocation={setLocation} />
      </MapContainer>
    </div>
  );
};

export default LocationMapInput;
