// Admin Page - Dashboard for property management
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyAPI, adminAPI, userAPI } from '../services/api';
import './Admin.css';

const Admin = ({ isAdmin }) => {
  const [properties, setProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [propertiesRes, statsRes, usersRes, allUsersRes] = await Promise.all([
        propertyAPI.getAll(),
        propertyAPI.getStatistics(),
        adminAPI.getTotalUsers(),
        userAPI.getAll()
      ]);

      const allProps = propertiesRes.data.data || [];
      setAllProperties(allProps);
      setProperties(allProps);
      setStatistics(statsRes.data.data);
      setTotalUsers(usersRes.data.data.totalUsers);
      setUsers(allUsersRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;

    try {
      await propertyAPI.delete(id);
      const updatedProperties = allProperties.filter(p => p._id !== id);
      setAllProperties(updatedProperties);
      setProperties(updatedProperties.filter(p => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'available') return p.status === 'available';
        if (activeFilter === 'sold') return p.status === 'sold';
        if (activeFilter === 'pending') return p.status === 'pending';
        return true;
      }));
      setMessage({ type: 'success', text: 'Property deleted successfully' });
      fetchData(); // Refresh statistics
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete property' });
    }
  };

  const handleUserDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await userAPI.delete(id);
      setUsers(users.filter(u => u._id !== id));
      setTotalUsers(prev => prev - 1); // Optimistic update
      setMessage({ type: 'success', text: 'User deleted successfully' });
      fetchData(); // Refresh all data to be sure
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete user' });
    }
  };

  const handleEdit = (property) => {
    setEditingProperty({ ...property });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await propertyAPI.update(editingProperty._id, editingProperty);
      setProperties(properties.map(p =>
        p._id === editingProperty._id ? editingProperty : p
      ));
      setEditingProperty(null);
      setMessage({ type: 'success', text: 'Property updated successfully' });
      fetchData();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update property' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProperty(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);

    if (filter === 'all') {
      setProperties(allProperties);
    } else if (filter === 'available') {
      setProperties(allProperties.filter(p => p.status === 'available'));
    } else if (filter === 'sold') {
      setProperties(allProperties.filter(p => p.status === 'sold'));
    } else if (filter === 'pending') {
      setProperties(allProperties.filter(p => p.status === 'pending'));
    }
  };

  // Show login prompt if not admin
  if (!isAdmin) {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <div className="admin-login-prompt">
            <h2>Admin Access Required</h2>
            <p>Please login as an administrator to access this page</p>
            <Link to="/login" className="btn btn-accent">Admin Login</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Admin Header */}
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage properties and view statistics</p>
        </div>

        {message.text && (
          <div className={`message message-${message.type}`}>
            {message.text}
            <button onClick={() => setMessage({ type: '', text: '' })}>×</button>
          </div>
        )}

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="stats-cards">
              <div
                className={`stat-card clickable ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => handleFilterClick('all')}
              >
                <div className="stat-icon">P</div>
                <div className="stat-info">
                  <span className="stat-number">{statistics?.totalProperties || 0}</span>
                  <span className="stat-label">Total Properties</span>
                </div>
              </div>
              <div
                className={`stat-card clickable ${activeFilter === 'available' ? 'active' : ''}`}
                onClick={() => handleFilterClick('available')}
              >
                <div className="stat-icon">A</div>
                <div className="stat-info">
                  <span className="stat-number">{statistics?.propertiesAvailable || 0}</span>
                  <span className="stat-label">Available</span>
                </div>
              </div>
              <div
                className={`stat-card clickable ${activeFilter === 'sold' ? 'active' : ''}`}
                onClick={() => handleFilterClick('sold')}
              >
                <div className="stat-icon">S</div>
                <div className="stat-info">
                  <span className="stat-number">{statistics?.propertiesSold || 0}</span>
                  <span className="stat-label">Sold</span>
                </div>
              </div>
              <div
                className={`stat-card clickable ${activeFilter === 'users' ? 'active' : ''}`}
                onClick={() => setActiveFilter('users')}
              >
                <div className="stat-icon">U</div>
                <div className="stat-info">
                  <span className="stat-number">{totalUsers}</span>
                  <span className="stat-label">Total Users</span>
                </div>
              </div>
            </div>

            {/* Property Type Stats */}
            <div className="type-stats">
              <h3>Properties by Type</h3>
              <div className="type-bars">
                <div className="type-bar">
                  <span className="type-name">Agricultural</span>
                  <div className="bar-container">
                    <div
                      className="bar agricultural"
                      style={{ width: `${(statistics?.byType?.agricultural / statistics?.totalProperties * 100) || 0}%` }}
                    ></div>
                  </div>
                  <span className="type-count">{statistics?.byType?.agricultural || 0}</span>
                </div>
                <div className="type-bar">
                  <span className="type-name">Residential</span>
                  <div className="bar-container">
                    <div
                      className="bar residential"
                      style={{ width: `${(statistics?.byType?.residential / statistics?.totalProperties * 100) || 0}%` }}
                    ></div>
                  </div>
                  <span className="type-count">{statistics?.byType?.residential || 0}</span>
                </div>
                <div className="type-bar">
                  <span className="type-name">Industrial</span>
                  <div className="bar-container">
                    <div
                      className="bar industrial"
                      style={{ width: `${(statistics?.byType?.industrial / statistics?.totalProperties * 100) || 0}%` }}
                    ></div>
                  </div>
                  <span className="type-count">{statistics?.byType?.industrial || 0}</span>
                </div>
              </div>
            </div>

            {/* Properties/Users Table */}
            <div className="properties-section">
              <div className="section-header">
                <h3>
                  {activeFilter === 'users' ? 'All Users' :
                    activeFilter === 'all' ? 'All Properties' :
                      activeFilter === 'available' ? 'Available Properties' :
                        activeFilter === 'sold' ? 'Sold Properties' :
                          'Pending Properties'}
                </h3>
                <span className="property-count">
                  {activeFilter === 'users' ? `${users.length} users` : `${properties.length} properties`}
                </span>
              </div>

              {activeFilter === 'users' ? (
                // Users Table
                users.length > 0 ? (
                  <div className="properties-table-wrapper">
                    <table className="properties-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Address</th>
                          <th>Joined</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone || 'N/A'}</td>
                            <td className="location-cell">{user.address || 'N/A'}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>
                              <div className="action-buttons">
                                <button
                                  className="btn-icon delete"
                                  onClick={() => handleUserDelete(user._id)}
                                  title="Delete User"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="no-data">
                    <p>No users found</p>
                  </div>
                )
              ) : (
                // Properties Table
                properties.length > 0 ? (
                  <div className="properties-table-wrapper">
                    <table className="properties-table">
                      <thead>
                        <tr>
                          <th>Property</th>
                          <th>Type</th>
                          <th>Size</th>
                          <th>Location</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.map(property => (
                          <tr key={property._id}>
                            <td>
                              <div className="property-cell">
                                <img
                                  src={property.landImage
                                    ? (property.landImage.startsWith('http') ? property.landImage : `http://localhost:5000${property.landImage}`)
                                    : ''
                                  }
                                  alt={property.landType}
                                />
                                <span>{property.ownerName}</span>
                              </div>
                            </td>
                            <td>{property.landType}</td>
                            <td>{property.landSize}</td>
                            <td className="location-cell">{property.landAddress}</td>
                            <td>
                              <span className={`status-badge status-${property.status || 'available'}`}>
                                {property.status || 'available'}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button
                                  className="btn-icon edit"
                                  onClick={() => handleEdit(property)}
                                  title="Edit"
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn-icon delete"
                                  onClick={() => handleDelete(property._id)}
                                  title="Delete"
                                >
                                  Delete
                                </button>
                                <Link
                                  to={`/property/${property._id}`}
                                  className="btn-icon view"
                                  title="View"
                                >
                                  View
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="no-data">
                    <p>No properties found</p>
                  </div>
                )
              )}
            </div>
          </>
        )}

        {/* Edit Modal */}
        {editingProperty && (
          <div className="modal-overlay" onClick={() => setEditingProperty(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Edit Property</h3>
                <button className="close-btn" onClick={() => setEditingProperty(null)}>×</button>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="modal-body">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Land Size</label>
                      <input
                        type="text"
                        name="landSize"
                        value={editingProperty.landSize}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Land Type</label>
                      <select
                        name="landType"
                        value={editingProperty.landType}
                        onChange={handleInputChange}
                      >
                        <option value="Agricultural land">Agricultural Land</option>
                        <option value="Residential land">Residential Land</option>
                        <option value="Industrial land">Industrial Land</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Land Address</label>
                    <input
                      type="text"
                      name="landAddress"
                      value={editingProperty.landAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        type="number"
                        name="price"
                        value={editingProperty.price || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        name="status"
                        value={editingProperty.status}
                        onChange={handleInputChange}
                      >
                        <option value="available">Available</option>
                        <option value="pending">Pending</option>
                        <option value="sold">Sold</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline" onClick={() => setEditingProperty(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-accent">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
