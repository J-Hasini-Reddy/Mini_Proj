export const validateListing = (formData) => {
  const errors = {};

  // Basic Info Validation
  if (!formData.title) errors.title = 'Title is required';
  if (!formData.address) errors.address = 'Address is required';
  if (!formData.city) errors.city = 'City is required';
  
  // Pincode Validation
  if (!formData.pincode) errors.pincode = 'Pincode must be exactly 6 digits';
  else if (!/^[0-9]{6}$/.test(formData.pincode)) 
    errors.pincode = 'Pincode must be exactly 6 digits';

  // Rent Validation
  if (!formData.rent) errors.rent = 'Rent is required';
  else if (isNaN(formData.rent) || formData.rent <= 0) 
    errors.rent = 'Rent must be a positive number';
  else if (formData.rent > 1000000) 
    errors.rent = 'Rent seems too high (max ₹1,000,000)';

  // Room Type Validation
  if (!formData.roomType) errors.roomType = 'Room type is required';

  // Sharing Type Validation
  if (!formData.sharingType) errors.sharingType = 'Sharing type is required';

  // Distance Validation
  if (formData.distance && isNaN(formData.distance)) 
    errors.distance = 'Distance must be a number';

  // University Validation
  const VALID_UNIVERSITIES = [
    'Bhoj Reddy Engineering College For Women',
    'JNTU Hyderabad',
    'Osmania University',
    'Vignan University',
    'VNR Vignana Jyothi Institute of Engineering & Technology',
    'K L University',
    'Sreenidhi Institute of Science and Technology'
  ];

  if (!formData.university || !VALID_UNIVERSITIES.includes(formData.university)) {
    errors.university = 'Please select a valid university';
  }

  // Amenities Validation
  if (!formData.amenities || formData.amenities.length === 0) {
    errors.amenities = 'Please select at least one amenity';
  }

  return errors;
};
