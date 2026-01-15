import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI, propertyAPI } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import './UserDashboard.css';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [listedProperties, setListedProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (!storedUser || !storedUser.id) {
                navigate('/login');
                return;
            }

            const response = await userAPI.getDashboard(storedUser.id);
            const { user, favorites, listedProperties } = response.data.data;
            setUser(user);
            setFavorites(favorites);
            setListedProperties(listedProperties);
            setEditData({
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                address: user.address || ''
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await userAPI.update(user._id, editData);
            if (response.data.success) {
                setUser(response.data.data);
                // Update localStorage with new user data (excluding favorites)
                const storedUser = JSON.parse(localStorage.getItem('user'));
                const updatedStoredUser = { ...storedUser, ...response.data.data, id: response.data.data._id };
                localStorage.setItem('user', JSON.stringify(updatedStoredUser));

                setMessage({ type: 'success', text: 'Profile updated successfully' });
                setIsEditing(false);
                window.scrollTo(0, 0);
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Error updating profile' });
            window.scrollTo(0, 0);
        }
    };

    const handleToggleStatus = async (propertyId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'sold' ? 'available' : 'sold';
            const response = await propertyAPI.update(propertyId, { status: newStatus });
            if (response.data.success) {
                // Update local state
                setListedProperties(prev => prev.map(p =>
                    p._id === propertyId ? { ...p, status: newStatus } : p
                ));
                setMessage({ type: 'success', text: `Property marked as ${newStatus}` });
            }
        } catch (error) {
            console.error('Error toggling status:', error);
            setMessage({ type: 'error', text: 'Failed to update property status' });
        }
    };

    const handleDeleteProperty = async (propertyId) => {
        if (!window.confirm('Are you sure you want to delete this property listing? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await propertyAPI.delete(propertyId);
            if (response.data.success) {
                setListedProperties(prev => prev.filter(p => p._id !== propertyId));
                setMessage({ type: 'success', text: 'Property listing deleted successfully' });
            }
        } catch (error) {
            console.error('Error deleting property:', error);
            setMessage({ type: 'error', text: 'Failed to delete property listing' });
        }
    };

    if (loading) return (
        <div className="loading-container">
            <div className="spinner"></div>
        </div>
    );

    if (!user) return null;

    return (
        <div className="user-dashboard">
            <div className="dashboard-container">
                {message.text && (
                    <div className={`message message-${message.type}`}>
                        {message.text}
                        <button className="message-close" onClick={() => setMessage({ type: '', text: '' })}>×</button>
                    </div>
                )}

                <div className="profile-section">
                    {!isEditing ? (
                        <div className="profile-header">
                            <div className="profile-info">
                                <h1>{user.name}</h1>
                                <p className="profile-email">{user.email}</p>
                                <div className="profile-details">
                                    <span>Address: {user.address || 'No address provided'}</span>
                                    <span>Phone: {user.phone || 'No phone provided'}</span>
                                </div>
                                <button className="btn btn-primary" onClick={() => setIsEditing(true)} style={{ marginTop: '20px' }}>
                                    Edit Details
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="edit-profile-form">
                            <h2>Edit Profile Details</h2>
                            <form onSubmit={handleUpdateProfile}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editData.name}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editData.email}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={editData.phone}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <textarea
                                        name="address"
                                        value={editData.address}
                                        onChange={handleEditChange}
                                    ></textarea>
                                </div>
                                <div className="button-group">
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                    <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                <div className="dashboard-content">
                    <section className="dashboard-section">
                        <div className="section-header">
                            <h2>My Favorites</h2>
                            <span className="count-badge">{favorites.length}</span>
                        </div>
                        {favorites.length > 0 ? (
                            <div className="properties-grid">
                                {favorites.map(property => (
                                    <PropertyCard key={property._id} property={property} />
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <p>No favorite properties yet. Start exploring!</p>
                                <button onClick={() => navigate('/')} className="btn-explore">Explore Properties</button>
                            </div>
                        )}
                    </section>

                    <section className="dashboard-section">
                        <div className="section-header">
                            <h2>My Listings</h2>
                            <span className="count-badge">{listedProperties.length}</span>
                        </div>
                        {listedProperties.length > 0 ? (
                            <div className="properties-grid">
                                {listedProperties.map(property => (
                                    <div key={property._id} className="listing-item">
                                        <PropertyCard property={property} />
                                        <div className="listing-actions">
                                            <button
                                                className={`btn ${property.status === 'sold' ? 'btn-outline' : 'btn-accent'}`}
                                                onClick={() => handleToggleStatus(property._id, property.status)}
                                            >
                                                {property.status === 'sold' ? 'Mark as Available' : 'Mark as Sold'}
                                            </button>
                                            <button
                                                className="btn btn-outline btn-delete"
                                                onClick={() => handleDeleteProperty(property._id)}
                                                style={{ borderColor: '#ef4444', color: '#ef4444' }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <p>You haven't listed any properties for sale.</p>
                                <button onClick={() => navigate('/seller')} className="btn-explore">List a Property</button>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
