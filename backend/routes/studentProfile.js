const express = require('express');
const router = express.Router();
const StudentProfile = require('../models/StudentProfile');
const verifyToken = require('../middleware/auth'); // ✅ your JWT middleware

// ✅ POST - Save or update student profile
router.post('/', verifyToken, async (req, res) => {
  const studentId = req.user.id;
  const profileData = req.body;

  try {
    const profile = await StudentProfile.findOneAndUpdate(
      { student: studentId },
      { $set: profileData, student: studentId },
      { upsert: true, new: true }
    );
    res.json({ message: 'Profile saved', profile });
  } catch (error) {
    res.status(500).json({ message: 'Error saving profile', error });
  }
});

// ✅ GET - Retrieve student profile


router.get('/', verifyToken, async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ student: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Add the student info from the auth token
    const response = {
      ...profile.toObject(),
      studentInfo: {
        username: req.user.username,
        id: req.user.id
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET - Get recommendations for student
router.get('/recommendations', verifyToken, async (req, res) => {
  try {
    const studentProfile = await StudentProfile.findOne({ student: req.user.id });
    if (!studentProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Fetch real listings from the database
    const Listing = require('../models/Listing');

    // Get student's university
    const university = studentProfile.university;

    // Find listings near the student's university
    const listings = await Listing.find({ university });

    // Calculate distance from university (mock calculation)
    const calculateDistance = (listing) => {
      // In a real implementation, this would use actual coordinates
      // Here we're just using a mock calculation based on listing ID
      return Math.random() * 5; // Random distance between 0-5km
    };

    // Add distance to each listing
    const listingsWithDistance = listings.map(listing => ({
      ...listing.toObject(),
      distance: calculateDistance(listing)
    }));

    // Sort by distance (closest first)
    const sortedListings = listingsWithDistance.sort((a, b) => a.distance - b.distance);

    // Get top 3 recommendations
    const topRecommendations = sortedListings.slice(0, 3);
    // Get next 2 similar properties
    const similarProperties = sortedListings.slice(3, 5);

    res.json({
      topRecommendations,
      similarProperties
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
});

module.exports = router;
