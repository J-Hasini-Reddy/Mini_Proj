const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// Get listing details by ID
router.get('/:id', async (req, res) => {
  try {
    // Validate ID format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid listing ID format' });
    }

    const listing = await Listing.findById(req.params.id)
      .populate('owner', 'name email phone')
      .select('title address city pincode university rent roomType sharingType amenities images location distance ownerName ownerEmail ownerPhone');

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Ensure all required fields are present
    const requiredFields = ['title', 'address', 'city', 'pincode', 'university', 'rent', 'roomType', 'sharingType', 'amenities', 'images', 'location'];
    const missingFields = requiredFields.filter(field => !listing[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Incomplete listing data', 
        missing: missingFields 
      });
    }

    res.json(listing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid listing ID' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
