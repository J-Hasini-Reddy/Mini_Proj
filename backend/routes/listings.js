const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// Get listing details by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('owner', 'name email phone');
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
