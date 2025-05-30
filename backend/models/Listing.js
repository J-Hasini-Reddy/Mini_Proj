const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PropertyOwner',
    required: true
  },
  title: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  university: { type: String, required: true },

  rent: { type: Number, required: true },
  roomType: { type: String, enum: ['Private', 'Shared', 'Studio'], required: true },
  sharingType: { type: String, enum: ['Private', '2 Sharing', '3+ Sharing'], required: true },

  amenities: [{ type: String }], // Will store strings like 'WiFi', 'Meals', etc.

  // Cloudinary images (URLs and IDs)
  images: [
    {
      url: String,
      public_id: String
    }
  ],

  // GeoJSON format for location
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },

  distance: { type: String }, // optional override (e.g. "1.5 km")

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index the location field for geospatial queries
listingSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Listing', listingSchema);
