// Main App Component - Routes configuration
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Seller from './pages/Seller';
import Buyer from './pages/Buyer';
import PropertyDetail from './pages/PropertyDetail';
import About from './pages/About';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';

function App() {
  // User state management
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAdmin = localStorage.getItem('isAdmin');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Handle user login
  const handleLogin = (userData, adminStatus = false) => {
    setUser(userData);
    setIsAdmin(adminStatus);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAdmin', adminStatus.toString());
  };

  // Handle user logout
  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
  };

  return (
    <div className="app">
      <Navbar user={user} isAdmin={isAdmin} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seller" element={<Seller user={user} />} />
          <Route path="/buyer" element={<Buyer />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin isAdmin={isAdmin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
