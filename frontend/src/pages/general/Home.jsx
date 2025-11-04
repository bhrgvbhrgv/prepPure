import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">PurePrep</div>
        <div className="nav-links">
          <Link to="/user/login" className="nav-link">Sign In</Link>
          <Link to="/user/register" className="nav-btn">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Watch Hygiene Happen Live
          </h1>
          <p className="hero-subtitle">
            India's first app that brings transparency to food preparation. 
            Watch your favorite restaurants maintain top-notch hygiene standards in real-time.
          </p>
          <div className="hero-buttons">
            <Link to="/user/register" className="cta-btn">Join as Customer</Link>
            <Link to="/food-partner/register" className="cta-btn outline">Register Restaurant</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose PurePrep?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🎥</div>
            <h3>Live Kitchen Streaming</h3>
            <p>Watch food preparation in real-time and ensure highest hygiene standards</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Transparency First</h3>
            <p>Know exactly how your food is being prepared and handled</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Quality Assurance</h3>
            <p>Restaurants verified for maintaining consistent hygiene standards</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💫</div>
            <h3>Trust Building</h3>
            <p>Building bridges between restaurants and customers through transparency</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to experience transparency in food service?</h2>
        <p>Join thousands of users who trust PurePrep for their dining decisions</p>
        <div className="cta-buttons">
          <Link to="/user/register" className="cta-btn">Get Started Now</Link>
        </div>
      </section>
    </div>
  )
}

export default Home
