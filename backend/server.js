const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// ✅ Apply CORS and JSON parser BEFORE routes
app.use(cors({
  origin: 'http://localhost:3000',  // React frontend
  credentials: true
}));
app.use(express.json());

// Routes
const studentAuthRoutes = require("./routes/studentAuth");
app.use("/api/student", studentAuthRoutes);

const ownerListingsRoutes = require('./routes/ownerListings');
app.use('/api/owner', ownerListingsRoutes);

const ownerAuthRoutes = require("./routes/ownerAuth");
app.use("/api/owner", ownerAuthRoutes);

const studentProfileRoutes = require('./routes/studentProfile');
app.use('/api/student/profile', studentProfileRoutes);

const recommendRoute = require('./routes/recommend');
app.use('/api/recommend', recommendRoute);



// Test route
app.get('/', (req, res) => res.send("API is running"));

// Recommendation route (forwards to Python Flask)
app.post('/api/recommend', async (req, res) => {
  try {
    const flaskResponse = await axios.post('http://127.0.0.1:5000/recommend', req.body);
    res.json(flaskResponse.data);
  } catch (error) {
    console.error('Error contacting Flask service:', error.message);
    res.status(500).json({ error: 'Failed to fetch recommendations from Python service' });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected successfully");
  // Create indexes for StudentProfile
  StudentProfile.createIndexes();
  console.log("Created indexes for StudentProfile");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1); // Exit process if connection fails
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));