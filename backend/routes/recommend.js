const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const universityCoords = require('../config/universityCoordinates');
const axios = require('axios');

// Helper to convert km to meters
const KM_TO_METERS = 1000;

router.post('/', async (req, res) => {
  try {
    const student = req.body;
    const university = student.university;

    const uniCoords = universityCoords[university];

    if (!uniCoords) {
      return res.status(400).json({ error: 'Unknown university' });
    }

    const [longitude, latitude] = uniCoords;

    const listings = await Listing.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          distanceField: 'dist.calculated',
          maxDistance: 5 * KM_TO_METERS, // 5 km
          spherical: true
        }
      },
      {
        $match: {
          university: university
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          address: 1,
          city: 1,
          pincode: 1,
          university: 1,
          rent: 1,
          roomType: 1,
          sharingType: 1,
          amenities: 1,
          location: 1,
          images: 1,
          location: 1,
          distance: { $divide: ["$dist.calculated", KM_TO_METERS] },
          ownerName: "$owner.name",
          ownerEmail: "$owner.email",
          ownerPhone: "$owner.phone"
        }
      }
    ]);

    // Call the Python Flask recommender
    try {
      const response = await axios.post('http://localhost:5001/recommend', {
        student,
        listings
      });
      return res.json(response.data);
    } catch (recommendError) {
      console.error('Recommendation service error:', recommendError);
      // Return empty recommendations if service is down
      return res.json({ recommendations: [] });
    }

    res.json(response.data);

  } catch (err) {
    console.error('Recommendation error:', err);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

module.exports = router;
