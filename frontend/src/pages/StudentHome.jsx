import React, { useState } from 'react';
import { Container, Navbar, Nav, Button, Form, InputGroup, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaBell, FaUserCircle, FaHeart, FaComments, FaSearch, FaStar, FaBus, FaCar, FaWalking, FaWifi, FaSnowflake, FaUtensils, FaBed, FaShower, FaMars, FaVenus, FaGenderless } from 'react-icons/fa';
import './StudentHome.css';

const mockProperties = [
  {
    id: 1,
    title: 'Cozy Studio near IIT Bombay',
    address: 'Powai, Mumbai',
    rating: 4.5,
    distance: '1.2 km',
    travelTimes: { car: '5 min', bus: '10 min', walk: '15 min' },
    roomType: 'Studio',
    sharing: 'Private',
    amenities: ['WiFi', 'AC', 'Meals', 'Ensuite'],
    price: '₹14,000/mo',
    images: ['/img1.jpg', '/img2.jpg'],
    bestPick: true,
  },
  {
    id: 2,
    title: '3 Sharing Room near Delhi University',
    address: 'North Campus, Delhi',
    rating: 4.2,
    distance: '0.9 km',
    travelTimes: { car: '3 min', bus: '7 min', walk: '10 min' },
    roomType: '3 Sharing',
    sharing: 'Triple',
    amenities: ['WiFi', 'Meals', 'AC', 'Attached Bathroom'],
    price: '₹8,000/mo',
    images: ['/img3.jpg', '/img4.jpg'],
    bestPick: true,
  },
  {
    id: 3,
    title: 'Single Room near Anna University',
    address: 'Guindy, Chennai',
    rating: 4.0,
    distance: '1.5 km',
    travelTimes: { car: '6 min', bus: '12 min', walk: '18 min' },
    roomType: 'Single',
    sharing: 'Private',
    amenities: ['WiFi', 'AC', 'Laundry'],
    price: '₹10,000/mo',
    images: ['/img5.jpg', '/img6.jpg'],
    bestPick: false,
  }
];

const PropertyCard = ({ property }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);

  const nextImage = () => setCurrentImage((currentImage + 1) % property.images.length);
  const prevImage = () => setCurrentImage((currentImage - 1 + property.images.length) % property.images.length);

  const renderAmenityIcon = (amenity) => {
    const icons = {
      'WiFi': <FaWifi />, 'AC': <FaSnowflake />, 'Meals': <FaUtensils />,
      'Ensuite': <FaShower />, 'Attached Bathroom': <FaShower />, 'Laundry': <FaBed />
    };
    return icons[amenity] || <FaBed />;
  };

  return (
    <Card className="d-flex flex-row mb-4 shadow-sm property-card">
      {/* Image Section */}
      <div className="position-relative image-container" onMouseEnter={nextImage} onMouseLeave={prevImage}>
        <Card.Img src={property.images[currentImage]} className="property-image" />
        {property.bestPick && <Badge bg="warning" className="position-absolute top-0 start-0 m-2">Best Pick</Badge>}
      </div>
<FaHeart
  className={`position-absolute top-0 end-0 m-2 fs-4 z-3 ${liked ? 'text-danger' : 'text-secondary'}`}
  onClick={() => setLiked(!liked)}
  style={{ cursor: 'pointer' }}
/>

      {/* Info Section */}
      <Card.Body>
        <Card.Title className="fw-bold fs-5">{property.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{property.address}</Card.Subtitle>

        <div className="d-flex align-items-center gap-3 mb-2">
          <span className="text-warning"><FaStar /> {property.rating}</span>
          <span className="text-muted">{property.distance} from university</span>
          <span className="text-muted d-flex gap-2">
            <FaCar title="By Car" /> {property.travelTimes.car} &nbsp;
            <FaBus title="By Bus" /> {property.travelTimes.bus} &nbsp;
            <FaWalking title="By Walk" /> {property.travelTimes.walk}
          </span>
        </div>

        <div className="mb-2">
          <strong>Room Type:</strong> {property.roomType} | <strong>Sharing:</strong> {property.sharing}
        </div>

        <div className="d-flex align-items-center gap-3 flex-wrap mb-2">
          {property.amenities.slice(0, 4).map((item, i) => (
            <span key={i} className="d-flex align-items-center gap-1">
              {renderAmenityIcon(item)} <small>{item}</small>
            </span>
          ))}
          {property.amenities.length > 4 && <span className="badge bg-secondary">+{property.amenities.length - 4} more</span>}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <h5 className="text-success fw-bold mb-0">{property.price}</h5>
          <Button variant="outline-primary">Enquire Now</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

const mockRoommates = [
  {
    id: 1,
    name: 'Aditi Sharma',
    age: 21,
    gender: 'female',
    university: 'IIT Bombay',
    course: 'Computer Science',
    personality: 'Friendly',
    hobbies: ['Music', 'Hiking', 'Cooking'],
    roomType: 'Shared',
    maxRent: '₹10,000',
    amenities: ['WiFi', 'Meals', 'Laundry'],
    lifestyle: {
      cleanliness: 'Neat',
      sleep: 'Night Owl',
      noise: 'Moderate',
      food: 'Vegetarian',
      substance: 'No Tolerance',
      guests: 'Sometimes'
    }
  },
  {
    id: 2,
    name: 'Rohan Verma',
    age: 22,
    gender: 'male',
    university: 'BITS Pilani',
    course: 'Mechanical Engineering',
    personality: 'Chill',
    hobbies: ['Reading', 'Gaming'],
    roomType: 'Private',
    maxRent: '₹12,000',
    amenities: ['AC', 'Attached Bathroom'],
    lifestyle: {
      cleanliness: 'Moderate',
      sleep: 'Early Bird',
      noise: 'Quiet',
      food: 'Non-Veg',
      substance: 'Occasional OK',
      guests: 'Rarely'
    }
  }
];


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
          {roommate.name.split(' ').map(word => word[0]).join('')}
        </div>
        <div className="mt-2">
          {genderIcon[roommate.gender] || genderIcon.other}
        </div>
      </div>

      {/* Info Section */}
      <Card.Body>
        <Card.Title className="fw-bold fs-5">{roommate.name}, {roommate.age}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{roommate.course} at {roommate.university}</Card.Subtitle>

        <div className="mb-2"><strong>Personality:</strong> {roommate.personality}</div>

        <div className="mb-2 d-flex flex-wrap gap-2">
          {roommate.hobbies.map((hobby, i) => (
            <span key={i} className="badge bg-info text-dark">{hobby}</span>
          ))}
        </div>

        <div className="mb-2">
          <strong>Room Preference:</strong> {roommate.roomType}, up to {roommate.maxRent}
        </div>

        <div className="d-flex flex-wrap gap-3 mb-2">
          {roommate.amenities.map((item, i) => (
            <span key={i} className="badge bg-light border text-dark">{item}</span>
          ))}
        </div>

        <div className="d-flex flex-wrap gap-3 mb-3">
          <span className="badge bg-success-subtle text-success">🧹 {roommate.lifestyle.cleanliness}</span>
          <span className="badge bg-warning-subtle text-dark">🌙 {roommate.lifestyle.sleep}</span>
          <span className="badge bg-light-subtle text-muted">🔇 {roommate.lifestyle.noise}</span>
          <span className="badge bg-primary-subtle text-white">🍽️ {roommate.lifestyle.food}</span>
          <span className="badge bg-danger-subtle text-danger">🚭 {roommate.lifestyle.substance}</span>
          <span className="badge bg-info-subtle text-dark">🛌 {roommate.lifestyle.guests}</span>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="primary">💬 Connect</Button>
          <Button variant="outline-danger">❤️ Save as Roommate</Button>
        </div>
      </Card.Body>
    </Card>
  );
};


const StudentHome = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState('stays');


  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    // Delay to allow click event on suggestions
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="student-home">
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="shadow-sm py-3">
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-4 text-primary">
            FindMyStay
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="align-items-center gap-4">
              <Nav.Link href="/connect" className="d-flex align-items-center gap-1">
                <FaComments /> Connect
              </Nav.Link>
              <Nav.Link href="/favorites" className="d-flex align-items-center gap-1">
                <FaHeart /> Favorites
              </Nav.Link>
              <Nav.Link href="/profile" className="d-flex align-items-center gap-1">
                <FaUserCircle /> Profile
              </Nav.Link>
              <Nav.Link href="/notifications">
                <FaBell size={20} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className="hero-section d-flex align-items-center text-white">
        <Container>
          <h1 className="display-5 fw-bold">Home away from home</h1>
          <p className="lead mb-4">Book student accommodations near top universities and cities across the globe.</p>

          <div className="search-wrapper position-relative">
            <InputGroup className="search-bar shadow-sm rounded">
              <Form.Control
                placeholder="Search by city, university or property..."
                aria-label="Search"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <Button variant="primary">
                <FaSearch />
              </Button>
            </InputGroup>

            {showSuggestions && (
              <div className="suggestion-box position-absolute bg-white p-3 shadow rounded w-100 mt-1 z-3">
                <div className="mb-2">
                  <strong className="text-muted">🏙️ Top Cities</strong>
                  <div className="d-flex flex-wrap gap-3 mt-2">
                    {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'].map(city => (
                      <div key={city} className="suggestion-item text-primary fw-medium cursor-pointer">{city}</div>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <strong className="text-muted">🎓 Top Universities</strong>
                  <div className="d-flex flex-wrap gap-3 mt-2">
                    {['IIT Bombay', 'IIT Delhi', 'IIT Madras', 'BITS Pilani', 'NIT Trichy', 'Anna University', 'Jadavpur University', 'University of Hyderabad'].map(university => (
                      <div key={university} className="suggestion-item text-primary fw-medium cursor-pointer">{university}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Toggle Section for Smart Stays and Roommate Picks */}
      <Container className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-semibold">Just for You</h3>
          <div className="btn-group">
  <Button
    variant={activeTab === 'stays' ? 'primary' : 'outline-primary'}
    onClick={() => setActiveTab('stays')}
  >
    🏠 Smart Stays
  </Button>
  <Button
    variant={activeTab === 'roommates' ? 'primary' : 'outline-primary'}
    onClick={() => setActiveTab('roommates')}
  >
    👯‍♂️ Roommate Picks
  </Button>
</div>

        </div>

        {/* Property Cards Section */}
        
        {activeTab === 'stays' && (
  <Row>
    {mockProperties.map(property => (
      <Col key={property.id} md={12}>
        <PropertyCard property={property} />
      </Col>
    ))}
  </Row>
)}

{activeTab === 'roommates' && (
  <Row>
    {mockRoommates.map((roommate) => (
      <Col key={roommate.id} md={12}>
        <RoommateCard roommate={roommate} />
      </Col>
    ))}
  </Row>
)}
      </Container>
    </div>
  );
};

export default StudentHome;
