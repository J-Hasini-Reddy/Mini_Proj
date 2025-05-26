import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaMars, FaVenus, FaGenderless } from 'react-icons/fa';

const RoommateCard = ({ roommate }) => {
  const genderIcon = {
    male: <FaMars title="Male" className="text-primary" />,
    female: <FaVenus title="Female" className="text-danger" />,
    other: <FaGenderless title="Other" className="text-muted" />
  };

  return (
    <Card className="d-flex flex-row mb-4 shadow-sm property-card position-relative">
      {/* Avatar Section */}
      <div className="position-relative d-flex flex-column align-items-center justify-content-center p-3">
        <div className="avatar bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center fs-3" style={{ width: 80, height: 80 }}>
          {roommate.name ? roommate.name.split(' ').map(word => word[0]).join('') : 'R'}
        </div>
        <div className="mt-2">
          {genderIcon[roommate.gender] || genderIcon.other}
        </div>
      </div>

      {/* Info Section */}
      <Card.Body>
        <Card.Title className="fw-bold fs-5">
          {roommate.name || 'Unknown Roommate'}
          {roommate.age ? `, ${roommate.age}` : ''}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {roommate.course} at {roommate.university}
        </Card.Subtitle>

        {roommate.personality && (
          <div className="mb-2"><strong>Personality:</strong> {roommate.personality}</div>
        )}

        {roommate.hobbies && roommate.hobbies.length > 0 && (
          <div className="mb-2 d-flex flex-wrap gap-2">
            {roommate.hobbies.map((hobby, i) => (
              <span key={i} className="badge bg-info text-dark">{hobby}</span>
            ))}
          </div>
        )}

        {roommate.roomType && (
          <div className="mb-2">
            <strong>Room Preference:</strong> {roommate.roomType}
            {roommate.maxRent && `, up to ${roommate.maxRent}`}
          </div>
        )}

        {roommate.amenities && roommate.amenities.length > 0 && (
          <div className="mb-2 d-flex flex-wrap gap-2">
            {roommate.amenities.map((amenity, i) => (
              <span key={i} className="badge bg-secondary">{amenity}</span>
            ))}
          </div>
        )}

        {roommate.sharingType && (
          <div className="mb-2">
            <strong>Sharing Preference:</strong> {roommate.sharingType}
          </div>
        )}

        {roommate.maxDistance && (
          <div className="mb-2">
            <strong>Location Preference:</strong> {roommate.maxDistance} from university
          </div>
        )}

        <div className="d-flex gap-2">
          <Button variant="primary">💬 Connect</Button>
          <Button variant="outline-danger">❤️ Save as Roommate</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RoommateCard;
