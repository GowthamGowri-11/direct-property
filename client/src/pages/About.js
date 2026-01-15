// About Page - Company information
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-container">
          <h1>About Direct Property</h1>
          <p>Your trusted partner in real estate since 2020</p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-content">
              <h2>Who We Are</h2>
              <p>
                Direct Property is a leading real estate platform that connects property 
                buyers and sellers directly. Founded with a vision to simplify property 
                transactions, we have grown to become one of the most trusted names in 
                the real estate industry.
              </p>
              <p>
                Our platform eliminates the need for intermediaries, allowing buyers and 
                sellers to connect directly. This not only saves time but also reduces 
                costs associated with traditional real estate transactions.
              </p>
            </div>
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=400&fit=crop" 
                alt="Real Estate"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="about-section bg-light">
        <div className="about-container">
          <div className="about-grid reverse">
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=500&h=400&fit=crop" 
                alt="Property Services"
              />
            </div>
            <div className="about-content">
              <h2>What We Do</h2>
              <p>
                We provide a comprehensive platform for all your real estate needs. 
                Whether you're looking to buy agricultural land for farming, residential 
                land for your dream home, or industrial land for your business, we've 
                got you covered.
              </p>
              <ul className="about-list">
                <li>
                  <span className="list-icon">•</span>
                  Property listing and management
                </li>
                <li>
                  <span className="list-icon">•</span>
                  Direct buyer-seller connections
                </li>
                <li>
                  <span className="list-icon">•</span>
                  Verified property listings
                </li>
                <li>
                  <span className="list-icon">•</span>
                  Secure transaction support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-section">
        <div className="about-container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <div className="card-icon">M</div>
              <h3>Our Mission</h3>
              <p>
                To democratize real estate by providing a transparent, efficient, and 
                user-friendly platform that empowers both buyers and sellers to make 
                informed decisions and conduct seamless property transactions.
              </p>
            </div>
            <div className="vision-card">
              <div className="card-icon">V</div>
              <h3>Our Vision</h3>
              <p>
                To become the most trusted and preferred real estate platform globally, 
                known for our commitment to transparency, innovation, and customer 
                satisfaction in every property transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Motto */}
      <section className="about-section bg-light">
        <div className="about-container">
          <div className="motto-section">
            <h2>Our Motto</h2>
            <h3 className="motto-text">No Brokerage!</h3>
            <p className="motto-description">
              Direct interaction between seller and buyer. We believe in connecting 
              property owners directly with potential buyers, eliminating middlemen 
              and saving you from unnecessary brokerage fees.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-section">
        <div className="about-container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">01</div>
              <h4>Direct Connection</h4>
              <p>No middlemen - buyers meet sellers directly</p>
            </div>
            <div className="value-card">
              <div className="value-icon">02</div>
              <h4>Zero Brokerage</h4>
              <p>Save money with no commission or hidden fees</p>
            </div>
            <div className="value-card">
              <div className="value-icon">03</div>
              <h4>Transparency</h4>
              <p>Clear and open communication in all dealings</p>
            </div>
            <div className="value-card">
              <div className="value-icon">04</div>
              <h4>Customer First</h4>
              <p>Your satisfaction is our top priority</p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="about-section bg-light">
        <div className="about-container">
          <div className="developer-section">
            <h2>Developed By</h2>
            <h3 className="developer-name">GowthamGowri M</h3>
            <p className="developer-role">Full Stack Developer</p>
            <p className="developer-bio">
              Passionate full stack developer with expertise in building modern web applications. 
              Specialized in MERN stack development (MongoDB, Express.js, React, Node.js). 
              Committed to creating user-friendly and efficient solutions for real-world problems.
            </p>
            <div className="developer-skills">
              <span className="skill-tag">React</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">MongoDB</span>
              <span className="skill-tag">Express.js</span>
              <span className="skill-tag">JavaScript</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
