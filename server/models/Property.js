// Property Model - Stores property listings
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  landSize: {
    type: String,
    required: [true, 'Land size is required'],
    trim: true
  },
  landType: {
    type: String,
    required: [true, 'Land type is required'],
    enum: ['Agricultural land', 'Residential land', 'Industrial land']
  },
  yearsOfOwnership: {
    type: Number,
    required: [true, 'Years of ownership is required'],
    min: 0
  },
  landImage: {
    type: String,
    default: ''
  },
  ownerName: {
    type: String,
    required: [true, 'Owner name is required'],
    trim: true
  },
  landAddress: {
    type: String,
    required: [true, 'Land address is required'],
    trim: true
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
    trim: true,
    validate: {
      validator: function (v) {
        return /^\d{6}$/.test(v);
      },
      message: 'Pincode must be a 6-digit number'
    }
  },
  contactName: {
    type: String,
    required: [true, 'Contact name is required'],
    trim: true
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    lowercase: true,
    trim: true
  },
  contactPhone: {
    type: String,
    required: [true, 'Contact phone is required'],
    trim: true
  },
  contactAddress: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'pending'],
    default: 'available'
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Property', propertySchema);
