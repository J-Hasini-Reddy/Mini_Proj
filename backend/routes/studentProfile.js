const express = require('express');
const router = express.Router();
const StudentProfile = require('../models/StudentProfile');
const verifyToken = require('../middleware/auth'); // ✅ your JWT middleware

// ✅ POST - Save or update student profile
router.post('/', verifyToken, async (req, res) => {
  const studentId = req.user.id;
  const profileData = req.body;

  try {
    console.log('Received profile data:', profileData);
    console.log('Student ID:', studentId);

    // Validate required fields
    if (!profileData.email) {
      return res.status(400).json({ 
        message: 'Email is required',
        error: 'Missing required field: email'
      });
    }

    // First, check if the Student exists
    const Student = require('../models/Student');
    const student = await Student.findById(studentId);
    
    if (!student) {
      // If student doesn't exist, create one
      const newStudent = new Student({
        _id: studentId,
        username: profileData.email.split('@')[0], // Use email as username
        email: profileData.email,
        college: profileData.university,
        course: profileData.course
      });
      
      try {
        await newStudent.save();
        console.log('Created new student:', newStudent);
      } catch (error) {
        console.error('Error creating student:', error);
        return res.status(500).json({
          message: 'Error creating student account',
          error: error.message
        });
      }
    }

    // Normalize gender case
    if (profileData.gender) {
      profileData.gender = profileData.gender.charAt(0).toUpperCase() + 
                         profileData.gender.slice(1).toLowerCase();
    }

    // Ensure we have the student ID in the profile data
    const profileDataWithStudent = {
      student: studentId,
      ...profileData
    };

    // Create or update the profile
    let profile;
    try {
      // First try to find existing profile
      profile = await StudentProfile.findOne({ student: studentId });
      
      if (profile) {
        // Update existing profile
        Object.assign(profile, profileDataWithStudent);
        profile = await profile.save();
      } else {
        // Create new profile
        profile = new StudentProfile(profileDataWithStudent);
        profile = await profile.save();
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }

    console.log('Profile saved successfully:', profile);
    res.json({ message: 'Profile saved', profile });
  } catch (error) {
    console.error('Error saving profile:', {
      error: error,
      stack: error.stack,
      studentId: studentId,
      profileData: profileData
    });
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        error: error.message,
        details: error.errors
      });
    }

    res.status(500).json({ 
      message: 'Error saving profile', 
      error: error.message 
    });
  }
});

// ✅ GET - Retrieve student profile


router.get('/', verifyToken, async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ student: req.user.id });

    if (!profile) {
      return res.json({ 
        message: 'No profile found - starting fresh',
        profile: {
          student: req.user.id,
          email: req.user.email,
          fullName: req.user.username,
          ...profileData // Add default empty values
        }
      });
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