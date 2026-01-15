const Property = require('../models/Property');
const path = require('path');
const fs = require('fs');

// Add new property
const addProperty = async (req, res) => {
  console.log('--- NEW PROPERTY SUBMISSION ---');
  console.log('Body:', req.body);
  console.log('File:', req.file ? 'Received: ' + req.file.filename : 'NOT RECEIVED');

  try {
    const propertyData = {
      landSize: req.body.landSize,
      landType: req.body.landType,
      yearsOfOwnership: Number(req.body.yearsOfOwnership),
      ownerName: req.body.ownerName,
      landAddress: req.body.landAddress,
      pincode: req.body.pincode,
      contactName: req.body.contactName,
      contactEmail: req.body.contactEmail,
      contactPhone: req.body.contactPhone,
      contactAddress: req.body.contactAddress,
      price: req.body.price ? Number(req.body.price) : 0
    };

    // Add seller if present
    if (req.body.seller && req.body.seller !== 'undefined' && req.body.seller !== 'null') {
      propertyData.seller = req.body.seller;
    }

    // Handle image upload
    if (req.file) {
      propertyData.landImage = `/uploads/${req.file.filename}`;
    } else {
      console.warn('Warning: Property submitted without image file');
    }

    const property = await Property.create(propertyData);

    res.status(201).json({
      success: true,
      message: 'Property added successfully',
      data: property
    });
  } catch (error) {
    console.error('Save Property Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error occurred while saving property',
      error: error.message
    });
  }
};

// ... other methods ...
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate('seller', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('seller', 'name email phone');

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      updateData.landImage = `/uploads/${req.file.filename}`;
    }

    if (updateData.yearsOfOwnership) updateData.yearsOfOwnership = Number(updateData.yearsOfOwnership);
    if (updateData.price) updateData.price = Number(updateData.price);

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Property updated successfully',
      data: property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    // Optional: Delete the physical file as well
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' });

    if (property.landImage && property.landImage.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', property.landImage);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

const getStatistics = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    const propertiesSold = await Property.countDocuments({ status: 'sold' });
    const propertiesAvailable = await Property.countDocuments({ status: 'available' });
    const propertiesPending = await Property.countDocuments({ status: 'pending' });

    const agriculturalCount = await Property.countDocuments({ landType: 'Agricultural land' });
    const residentialCount = await Property.countDocuments({ landType: 'Residential land' });
    const industrialCount = await Property.countDocuments({ landType: 'Industrial land' });

    res.status(200).json({
      success: true,
      data: {
        totalProperties,
        propertiesSold,
        propertiesAvailable,
        propertiesPending,
        byType: {
          agricultural: agriculturalCount,
          residential: residentialCount,
          industrial: industrialCount
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getStatistics
};
