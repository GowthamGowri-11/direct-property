// PropertyCard Component - Displays property in card format
import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const {
    _id,
    landImage,
    landType,
    landSize,
    landAddress,
    price,
    status
  } = property;

  // Default image if none provided
  const baseUrl = 'http://localhost:5000';
  const imageUrl = landImage
    ? (landImage.startsWith('http') ? landImage : `${baseUrl}${landImage}`)
    : '';

  if (!landImage) console.log('No user image provided for property:', _id);

  // Format price
  const formatPrice = (price) => {
    if (!price) return 'Contact for Price';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'sold':
        return 'status-sold';
      case 'pending':
        return 'status-pending';
      default:
        return 'status-available';
    }
  };

  return (
    <Link to={`/property/${_id}`} className="property-card">
      <div className="property-image">
        <img
          src={imageUrl}
          alt={landType}
        />
        <span className={`property-status ${getStatusClass(status)}`}>
          {status || 'Available'}
        </span>
        <span className="property-type-badge">{landType}</span>
      </div>
      <div className="property-content">
        <h3 className="property-title">{landType}</h3>
        <p className="property-location">
          {landAddress}
        </p>
        <div className="property-details">
          <span className="property-size">
            {landSize}
          </span>
        </div>
        <div className="property-footer">
          <span className="property-price">{formatPrice(price)}</span>
          <span className="view-details">View Details</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
