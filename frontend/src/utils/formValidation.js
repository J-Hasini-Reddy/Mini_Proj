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

  // Travel Time Validation
  const timePatterns = {
    car: formData.travelTime.car,
    bus: formData.travelTime.bus,
    walk: formData.travelTime.walk
  };

  Object.entries(timePatterns).forEach(([mode, time]) => {
    if (time && !/^\d+\s*(min|minutes|mins|hr|hours)?$/.test(time)) {
      errors[mode] = `Invalid ${mode} travel time format (e.g., "5 min", "10 minutes")`;
    }
  });

  return errors;
};
