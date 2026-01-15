// Buyer Page - Dynamic property listings
import React, { useState, useEffect, useCallback } from 'react';
import PropertyCard from '../components/PropertyCard';
import { propertyAPI } from '../services/api';
import './Buyer.css';

const Buyer = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter states
  const [filters, setFilters] = useState({
    landType: '',
    status: '',
    search: ''
  });

  // Fetch all properties from API
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      const response = await propertyAPI.getAll();
      setProperties(response.data.data || []);
      setError('');
    } catch (err) {
      setError('Failed to load properties. Please try again later.');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch properties on mount
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Apply filters when properties or filters change
  useEffect(() => {
    let result = [...properties];

    // Filter by land type
    if (filters.landType) {
      result = result.filter(p => p.landType === filters.landType);
    }

    // Filter by status
    if (filters.status) {
      result = result.filter(p => p.status === filters.status);
    }

    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(p => 
        p.landAddress?.toLowerCase().includes(searchLower) ||
        p.ownerName?.toLowerCase().includes(searchLower) ||
        p.landType?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredProperties(result);
  }, [properties, filters]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      landType: '',
      status: '',
      search: ''
    });
  };

  return (
    <div className="buyer-page">
      <div className="buyer-container">
        {/* Page Header */}
        <div className="buyer-header">
          <h1>Browse Properties</h1>
          <p>Find your perfect property from our extensive listings</p>
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="filters-row">
            <div className="filter-group">
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search by location, owner..."
                className="search-input"
              />
            </div>
            <div className="filter-group">
              <select
                name="landType"
                value={filters.landType}
                onChange={handleFilterChange}
              >
                <option value="">All Property Types</option>
                <option value="Agricultural land">Agricultural Land</option>
                <option value="Residential land">Residential Land</option>
                <option value="Industrial land">Industrial Land</option>
              </select>
            </div>
            <div className="filter-group">
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Status</option>
                <option value="available">Available</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <button className="btn btn-outline clear-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
          <div className="results-count">
            Showing {filteredProperties.length} of {properties.length} properties
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="message message-error">
            {error}
            <button className="btn btn-outline retry-btn" onClick={fetchProperties}>
              Retry
            </button>
          </div>
        )}

        {/* Properties Grid */}
        {!loading && !error && (
          <>
            {filteredProperties.length > 0 ? (
              <div className="properties-grid">
                {filteredProperties.map(property => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            ) : (
              <div className="no-properties">
                <h3>No Properties Found</h3>
                <p>
                  {properties.length === 0 
                    ? 'No properties have been listed yet. Check back later!'
                    : 'No properties match your current filters. Try adjusting your search criteria.'}
                </p>
                {properties.length > 0 && (
                  <button className="btn btn-accent" onClick={clearFilters}>
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Buyer;
