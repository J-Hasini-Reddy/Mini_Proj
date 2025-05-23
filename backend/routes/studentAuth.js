const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

const router = express.Router();

// Secret for JWT (keep this secret!)
const JWT_SECRET = 'your_jwt_secret_key_here'; // Use dotenv in production

// @route   POST /api/student/register
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, college, course } = req.body;

    // Check if user already exists
    const existingUser = await Student.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new student
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

    // Create JWT token
    const token = jwt.sign(
      { id: student._id, username: student.username },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, student: { username: student.username, email: student.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;
