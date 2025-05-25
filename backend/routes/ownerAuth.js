const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner');
const verifyToken = require('../middleware/auth'); // 🔐 JWT middleware

const router = express.Router();

// @route   POST /api/owner/register
router.post('/register', async (req, res) => {
  const { username, password, email, company } = req.body;
  try {
    const existingUser = await Owner.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newOwner = new Owner({ username, password: hashedPassword, email, company });
    await newOwner.save();

    res.status(201).json({ message: 'Owner registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering owner' });
  }
});

// @route   POST /api/owner/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const owner = await Owner.findOne({ username });
    if (!owner) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: owner._id, username: owner.username },
      process.env.JWT_SECRET,
      { expiresIn: '2h' } // ⏳ consistent with student auth
    );

    res.json({
      token,
      owner: {
        username: owner.username,
        email: owner.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;
