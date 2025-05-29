const mongoose = require('mongoose');

const StudentProfileSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student',
    required: true,
    validate: {
      validator: function(v) {
        return mongoose.Types.ObjectId.isValid(v);
      },
      message: props => `${props.value} is not a valid ObjectId`
    }
  },
  fullName: { type: String, required: true, trim: true },
  age: { type: Number, min: 16, max: 100 },
  gender: { 
    type: String, 
    set: function(value) {
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    },
    enum: ['Male', 'Female', 'Other'] 
  },
  course: { type: String, required: true, trim: true },
  university: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address`
    }
  },
  bio: { type: String, trim: true },
  personality: { type: String, trim: true },
  hobbies: [{ type: String, trim: true }],
  entertainment: { type: String, trim: true },
  dreamLifestyle: { type: String, trim: true },
  roommateExpectations: { type: String, trim: true },
  cleanliness: { type: String, enum: ['Very Clean', 'Clean', 'Moderate', 'Casual'] },
  sleepSchedule: { type: String, trim: true },
  noise: { type: String, enum: ['Quiet', 'Moderate', 'Loud'] },
  food: { type: String, trim: true },
  substanceUse: { type: String, enum: ['No', 'Occasional', 'Frequent'] },
  guests: { type: String, enum: ['No', 'Occasional', 'Frequent'] },
  roomType: { type: String, trim: true },
  sharingType: {
    type: String,
    enum: ['Private', '2 Sharing', '3+ Sharing'],
    default: 'Private'
  },
  maxRent: { type: String, trim: true },
  maxDistance: { type: String, trim: true },
  amenities: [{ type: String, trim: true }],
}, { timestamps: true });

// Create indexes for better query performance
StudentProfileSchema.index({ student: 1 }, { unique: true });
StudentProfileSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('StudentProfile', StudentProfileSchema);


