import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LocationPicker = ({ location, setLocation }) => {
  useMapEvents({
    click(e) {
      setLocation([e.latlng.lat, e.latlng.lng]);
    }
  });

  return location ? <Marker position={location} /> : null;
};

const LocationMapInput = ({ location, setLocation }) => {
  return (
    <div>
      <p>Click on the map to select your property location:</p>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '300px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationPicker location={location} setLocation={setLocation} />
      </MapContainer>
    </div>
  );
};

export default LocationMapInput;
