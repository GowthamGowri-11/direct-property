
// Seller Page - Property submission form
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { propertyAPI } from '../services/api';
import './Seller.css';

const Seller = ({ user }) => {
  // Form state
  const [formData, setFormData] = useState({
    landSize: '',
    landType: '',
    yearsOfOwnership: '',
    ownerName: '',
    landAddress: '',
    pincode: '',
    contactName: user?.name || '',
    contactEmail: user?.email || '',
    contactPhone: user?.phone || '',
    contactAddress: user?.address || '',
    price: ''
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  // Form validation
  const validateForm = () => {
    const required = ['landSize', 'landType', 'yearsOfOwnership', 'ownerName',
      'landAddress', 'pincode', 'contactName', 'contactEmail', 'contactPhone'];

    for (let field of required) {
      if (!formData[field]) {
        setMessage({ type: 'error', text: `Please fill in all required fields` });
        return false;
      }
    }

    if (!image) {
      setMessage({ type: 'error', text: 'Please upload a property image' });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactEmail)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return false;
    }

    // Pincode validation
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(formData.pincode)) {
      setMessage({ type: 'error', text: 'Please enter a valid 6-digit pincode' });
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = new FormData();

      // Append all form fields
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });

      // Append image if selected
      if (image) {
        submitData.append('landImage', image);
      }

      // Add seller ID if user is logged in
      if (user?.id) {
        submitData.append('seller', user.id);
      }

      await propertyAPI.create(submitData);

      setMessage({ type: 'success', text: 'Property submitted successfully! It will be reviewed and listed shortly.' });
      window.scrollTo(0, 0);

      // Reset form
      setFormData({
        landSize: '',
        landType: '',
        yearsOfOwnership: '',
        ownerName: '',
        landAddress: '',
        pincode: '',
        contactName: user?.name || '',
        contactEmail: user?.email || '',
        contactPhone: user?.phone || '',
        contactAddress: user?.address || '',
        price: ''
      });
      setImage(null);
      setImagePreview(null);

    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to submit property. Please try again.'
      });
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

  // Show login prompt if user is not logged in
  if (!user) {
    return (
      <div className="seller-page">
        <div className="seller-container">
          <div className="login-prompt">
            <h2>Login Required</h2>
            <p>Please login or register to list your property for sale</p>
            <div className="login-prompt-buttons">
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/register" className="btn btn-outline">Register</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="seller-page">
      <div className="seller-container">
        <div className="seller-header">
          <h1>List Your Property</h1>
          <p>Fill in the details below to list your property for sale</p>
        </div>

        {message.text && (
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="seller-form-card">
          <form onSubmit={handleSubmit}>
            {/* Property Details Section */}
            <div className="form-section">
              <h3 className="form-section-title">Property Details</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="landSize">Land Size *</label>
                  <input
                    type="text"
                    id="landSize"
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleChange}
                    placeholder="e.g., 5 acres, 1000 sq ft"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="landType">Land Type *</label>
                  <select
                    id="landType"
                    name="landType"
                    value={formData.landType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Land Type</option>
                    <option value="Agricultural land">Agricultural Land</option>
                    <option value="Residential land">Residential Land</option>
                    <option value="Industrial land">Industrial Land</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="yearsOfOwnership">Years of Ownership *</label>
                  <input
                    type="number"
                    id="yearsOfOwnership"
                    name="yearsOfOwnership"
                    value={formData.yearsOfOwnership}
                    onChange={handleChange}
                    placeholder="e.g., 10"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price (₹ INR)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g., 5000000"
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="ownerName">Land Owner Name *</label>
                <input
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Full name of the property owner"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="landAddress">Land Address *</label>
                <input
                  type="text"
                  id="landAddress"
                  name="landAddress"
                  value={formData.landAddress}
                  onChange={handleChange}
                  placeholder="Complete address of the property"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="pincode">Pincode *</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="e.g., 600001"
                  maxLength="6"
                  pattern="\d{6}"
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="form-group">
                <label>Property Image</label>
                <div
                  className={`image-upload ${imagePreview ? 'has-image' : ''}`}
                  onClick={() => document.getElementById('landImage').click()}
                >
                  {imagePreview ? (
                    <div className="image-preview-container">
                      <img src={imagePreview} alt="Preview" className="image-preview" />
                      <button
                        type="button"
                        className="remove-image"
                        onClick={(e) => { e.stopPropagation(); removeImage(); }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="upload-text">Click to upload property image</p>
                      <p className="upload-hint">JPG, PNG, GIF up to 5MB</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="landImage"
                  name="landImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            {/* Contact Details Section */}
            <div className="form-section">
              <h3 className="form-section-title">Contact Details</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactName">Contact Name *</label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactEmail">Email *</label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactPhone">Phone Number *</label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactAddress">Your Address</label>
                  <input
                    type="text"
                    id="contactAddress"
                    name="contactAddress"
                    value={formData.contactAddress}
                    onChange={handleChange}
                    placeholder="Your address"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-accent btn-submit"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Property'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Seller;
