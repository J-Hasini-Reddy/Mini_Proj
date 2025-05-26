require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const verifyToken = require('../middleware/auth'); // JWT middleware

const router = express.Router();

// Secret for JWT (in production, use process.env.JWT_SECRET)
const JWT_SECRET = process.env.JWT_SECRET;

// @route   POST /api/student/register
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, college, course } = req.body;

    const existingUser = await Student.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      username,
      password: hashedPassword,
      email,
      college,
      course
    });

    await newStudent.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// @route   POST /api/student/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const student = await Student.findOne({ username });
    if (!student) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: student._id, username: student.username },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      token,
      student: {
        username: student.username,
        email: student.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// 🔒 PROTECTED ROUTES BELOW

// @route   POST /api/student/save-profile
// @desc    Save or update student profile
router.post('/save-profile', verifyToken, async (req, res) => {
  try {
    const studentId = req.user.id;
    const profileData = req.body;

    // You can choose to update or create a sub-document
    const student = await Student.findByIdAndUpdate(
      studentId,
      { profile: profileData },
      { new: true, upsert: true }
    );

    res.json({ message: 'Profile saved successfully', student });
  } catch (error) {
    console.error('Profile save error:', error);
    res.status(500).json({ error: 'Error saving profile' });
  }
});


module.exports = router;
