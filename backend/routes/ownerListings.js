// routes/ownerListings.js

const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const authenticate = require('../middleware/authenticateOwner');

// POST /api/owner/add-listing
router.post('/add-listing', authenticate, async (req, res) => {
  try {
    const {
      title,
      address,
      city,
      pincode,
      university,
      rent,
      roomType,
      sharingType,
      amenities,
      images, 
      location, 
      distance,
      travelTime
    } = req.body;

    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one image is required' });
    }

      if (!Array.isArray(location) || location.length !== 2) {
      return res.status(400).json({ success: false, message: 'Invalid location format. Must be [lat, lng]' });
    }




    const newListing = new Listing({
      title,
      address,
      city,
      pincode,
      university,
      rent,
      roomType,
      sharingType,
      amenities,
      images, // [{ url, public_id }]
      location: {
        type: 'Point',
        coordinates: [location[1], location[0]] // GeoJSON: [lng, lat]
      },
      distance,
      travelTime,
      ownerId: req.ownerId
    });

    await newListing.save();
    res.status(201).json({ success: true, message: 'Listing created successfully' });
  } catch (err) {
    console.error('Error saving listing:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
