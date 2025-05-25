const express = require('express');
const router = express.Router();
const StudentProfile = require('../models/StudentProfile');
const authenticateToken = require('../middleware/auth'); // JWT middleware

// POST - Save or update student profile
router.post('/', authenticateToken, async (req, res) => {
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

// GET - Retrieve profile
router.get('/', authenticateToken, async (req, res) => {
  const studentId = req.user.id;

  try {
    const profile = await StudentProfile.findOne({ student: studentId });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
});

module.exports = router;
