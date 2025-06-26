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
      console.log("Selected location:", coords);
      setLocation(coords);
    }
  });

  // Handle GeoJSON Point format and other formats
  const markerLocation = () => {
    if (Array.isArray(location)) {
      return location;
    }
    if (location && location.type === 'Point') {
      // Handle GeoJSON Point format
      return [location.coordinates[1], location.coordinates[0]]; // [lat, lng]
    }
    if (location && location.lat && location.lng) {
      return [location.lat, location.lng];
    }
    return null;
  };

  const coords = markerLocation();
  console.log('Location coordinates:', coords);
  
  return coords ? <Marker position={coords} /> : null;
};


const LocationMapInput = ({ location, setLocation }) => {
  const center = location ? (
    Array.isArray(location) 
      ? location 
      : location.type === 'Point' 
        ? [location.coordinates[1], location.coordinates[0]]
        : [location.lat, location.lng]
  ) : [17.385044, 78.486671];

  return (
    <div>
      <h3>Location Map</h3>
      <MapContainer center={center} zoom={15} style={{ height: '300px', width: '100%' }}
                    whenCreated={(map) => {
                      if (location) {
                        const coords = Array.isArray(location) 
                          ? location 
                          : location.type === 'Point' 
                            ? [location.coordinates[1], location.coordinates[0]]
                            : [location.lat, location.lng];
                        map.setView(coords, 15);
                      }
                    }}>

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationPicker location={location} setLocation={setLocation} />
      </MapContainer>
    </div>
  );
};

export default LocationMapInput;
