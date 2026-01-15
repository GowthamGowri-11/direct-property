// PropertyDetail Page - Full property information
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { propertyAPI, userAPI } from '../services/api';
import './PropertyDetail.css';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchProperty();
    checkFavorite();
  }, [id]);

  const checkFavorite = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      try {
        const res = await userAPI.getById(storedUser.id);
        const favs = res.data.data.favorites || [];
        if (favs.some(fav => fav.toString() === id)) {
          setIsFavorite(true);
        }
      } catch (e) {
        console.error('Error checking favorite:', e);
      }
    }
  };

  const handleFavorite = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
      return;
    }
    try {
      await userAPI.toggleFavorite({ userId: storedUser.id, propertyId: id });
      setIsFavorite(!isFavorite);
    } catch (e) {
      console.error('Error toggling favorite:', e);
    }
  };

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await propertyAPI.getById(id);
      setProperty(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to load property details. The property may not exist.');
      console.error('Error fetching property:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    try {
      const newStatus = property.status === 'sold' ? 'available' : 'sold';
      const response = await propertyAPI.update(id, { status: newStatus });
      if (response.data.success) {
        setProperty({ ...property, status: newStatus });
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const isOwner = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || !property || !property.seller) return false;

    // seller can be an object (populated) or an ID string
    const sellerId = typeof property.seller === 'object' ? property.seller._id : property.seller;
    return storedUser.id === sellerId;
  };

  // Format price
  const formatPrice = (price) => {
    if (!price) return 'Contact for Price';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'sold': return 'status-sold';
      case 'pending': return 'status-pending';
      default: return 'status-available';
    }
  };

  if (loading) {
    return (
      <div className="property-detail-page">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="property-detail-page">
        <div className="detail-container">
          <div className="error-state">
            <h2>Property Not Found</h2>
            <p>{error || 'The property you are looking for does not exist.'}</p>
            <Link to="/buyer" className="btn btn-accent">
              Browse Properties
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const baseUrl = 'http://localhost:5000';
  const imageUrl = property.landImage
    ? (property.landImage.startsWith('http') ? property.landImage : `${baseUrl}${property.landImage}`)
    : '';

  console.log('Property Image URL:', imageUrl);

  return (
    <div className="property-detail-page">
      <div className="detail-container">
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back to Properties
        </button>

        {/* Property Header */}
        <div className="detail-header">
          <div className="detail-image">
            <img
              src={imageUrl}
              alt={property.landType}
            />
            <span className={`detail-status ${getStatusClass(property.status)}`}>
              {property.status || 'Available'}
            </span>
          </div>
        </div>

        {/* Property Content */}
        <div className="detail-content">
          <div className="detail-main">
            {/* Title and Price */}
            <div className="detail-title-section">
              <div>
                <span className="property-type-tag">{property.landType}</span>
                <h1>{property.landType}</h1>
                <p className="detail-location">
                  {property.landAddress}
                </p>
              </div>
              <div className="detail-price">
                {formatPrice(property.price)}
              </div>
            </div>

            {/* Property Details */}
            <div className="detail-section">
              <h2>Property Details</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Land Size</span>
                  <span className="detail-value">{property.landSize}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Land Type</span>
                  <span className="detail-value">{property.landType}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Years of Ownership</span>
                  <span className="detail-value">{property.yearsOfOwnership} years</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Owner Name</span>
                  <span className="detail-value">{property.ownerName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Pincode</span>
                  <span className="detail-value">{property.pincode}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className={`detail-value status-text ${getStatusClass(property.status)}`}>
                    {property.status || 'Available'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Listed On</span>
                  <span className="detail-value">{formatDate(property.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="detail-section">
              <h2>Location</h2>
              <p className="detail-description">
                This {property.landType.toLowerCase()} is located at {property.landAddress}.
                The property spans {property.landSize} and has been owned by the current owner
                for {property.yearsOfOwnership} years.
              </p>
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="detail-sidebar">
            <div className="contact-card">
              <h3>Contact Seller</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <div>
                    <span className="contact-label">Name</span>
                    <span className="contact-value">{property.contactName}</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div>
                    <span className="contact-label">Email</span>
                    <a href={`mailto:${property.contactEmail}`} className="contact-value contact-link">
                      {property.contactEmail}
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <div>
                    <span className="contact-label">Phone</span>
                    <a href={`tel:${property.contactPhone}`} className="contact-value contact-link">
                      {property.contactPhone}
                    </a>
                  </div>
                </div>
                {property.contactAddress && (
                  <div className="contact-item">
                    <div>
                      <span className="contact-label">Address</span>
                      <span className="contact-value">{property.contactAddress}</span>
                    </div>
                  </div>
                )}
              </div>
              {isOwner() ? (
                <button
                  className={`btn ${property.status === 'sold' ? 'btn-outline' : 'btn-accent'}`}
                  onClick={handleToggleStatus}
                  style={{ width: '100%', marginTop: '12px' }}
                >
                  {property.status === 'sold' ? 'Mark as Available' : 'Mark as Sold'}
                </button>
              ) : (
                <button
                  className={`btn ${isFavorite ? 'btn-accent' : 'btn-outline'}`}
                  onClick={handleFavorite}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '12px' }}
                >
                  {isFavorite ? 'Remove from Favorites' : 'Mark as Favorite'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
