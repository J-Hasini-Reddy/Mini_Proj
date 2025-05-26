const mongoose = require('mongoose');

const StudentProfileSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student',required: true, unique: true },
  fullName: String,
  age: Number,
  gender: String,
  course: String,
  university: String,
  email: { type: String, required: true, unique: true },
  bio: String,
  personality: String,
  hobbies: [String],
  entertainment: String,
  dreamLifestyle: String,
  roommateExpectations: String,
  cleanliness: String,
  sleepSchedule: String,
  noise: String,
  food: String,
  substanceUse: String,
  guests: String,
  roomType: String,
  sharingType: {
  type: String,
  enum: ['Private', '2 Sharing', '3+ Sharing'],
  default: 'Private'
},
  maxRent: String,
  maxDistance: String,
  amenities: [String],
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', StudentProfileSchema);
