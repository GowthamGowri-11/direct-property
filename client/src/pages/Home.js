// Home Page - Landing page with hero section
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Find Your Perfect
              <span className="highlight"> Property</span>
            </h1>
            <p className="hero-subtitle">
              Direct Property connects buyers and sellers for seamless real estate
              transactions. Whether you're looking to buy agricultural, residential,
              or industrial land, we've got you covered.
            </p>
            <div className="hero-buttons">
              <Link to="/buyer" className="btn btn-primary btn-lg">
                Buy Property
              </Link>
              <Link to="/seller" className="btn btn-outline btn-lg">
                Sell Property
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop"
                alt="Modern Property"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Direct Property?</h2>
            <p>We make property transactions simple, secure, and straightforward</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">01</div>
              <h3>Wide Selection</h3>
              <p>Browse through a diverse range of agricultural, residential, and industrial properties</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">02</div>
              <h3>Direct Connection</h3>
              <p>Connect directly with property owners without any middlemen or hidden fees</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">03</div>
              <h3>Secure Transactions</h3>
              <p>All property listings are verified to ensure safe and secure transactions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">04</div>
              <h3>Easy to Use</h3>
              <p>Our platform is designed for simplicity, making property search effortless</p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section className="property-types">
        <div className="container">
          <div className="section-header">
            <h2>Explore Property Types</h2>
            <p>Find the perfect land that suits your needs</p>
          </div>
          <div className="types-grid">
            <Link to="/buyer" className="type-card agricultural">
              <div className="type-overlay"></div>
              <div className="type-content">
                <h3>Agricultural Land</h3>
                <p>Fertile lands perfect for farming and agriculture</p>
                <span className="type-link">Explore</span>
              </div>
            </Link>
            <Link to="/buyer" className="type-card residential">
              <div className="type-overlay"></div>
              <div className="type-content">
                <h3>Residential Land</h3>
                <p>Prime locations for building your dream home</p>
                <span className="type-link">Explore</span>
              </div>
            </Link>
            <Link to="/buyer" className="type-card industrial">
              <div className="type-overlay"></div>
              <div className="type-content">
                <h3>Industrial Land</h3>
                <p>Strategic locations for business and industry</p>
                <span className="type-link">Explore</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to List Your Property?</h2>
            <p>Join thousands of sellers who have successfully sold their properties through Direct Property</p>
            <Link to="/seller" className="btn btn-primary btn-lg">
              Start Selling Today
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Simple steps to buy or sell your property directly</p>
          </div>
          <div className="steps-grid">
            <div className="step-item">
              <span className="step-number">01</span>
              <h3>Create Account</h3>
              <p>Register as a buyer or seller to access all specialized features of our platform.</p>
            </div>
            <div className="step-item">
              <span className="step-number">02</span>
              <h3>Search or List</h3>
              <p>Browse detailed listings with filters or list your own property with clear photos and details.</p>
            </div>
            <div className="step-item">
              <span className="step-number">03</span>
              <h3>Direct Contact</h3>
              <p>Connect directly with property owners or interested buyers through the provided contact details.</p>
            </div>
            <div className="step-item">
              <span className="step-number">04</span>
              <h3>Transparency</h3>
              <p>Complete your KYC and background verification to ensure a safe and secure direct transaction.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
