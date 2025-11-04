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

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">PurePrep</h3>
            <p className="footer-description">
              India's first platform for transparent food preparation. 
              Building trust through live kitchen streaming.
            </p>
            <div className="social-links">
              <a href="https://twitter.com/pureprep" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://facebook.com/pureprep" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com/pureprep" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com/company/pureprep" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">For Restaurants</h4>
            <ul className="footer-links">
              <li><Link to="/food-partner/register">Partner with Us</Link></li>
              <li><Link to="/success-stories">Success Stories</Link></li>
              <li><Link to="/partner-support">Partner Support</Link></li>
              <li><Link to="/resources">Resources</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Contact</h4>
            <ul className="footer-contact">
              <li>
                <i className="fas fa-envelope"></i>
                <a href="mailto:support@pureprep.com">erbhargavdas@gamil.com</a>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <a href="tel:+919876543210">+91 1231231</a>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <address>
                  Jabalpur, Madhya Pradesh, India
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} PurePrep. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
