import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FoodPartnerDashboard.css';

const FoodPartnerDashboard = () => {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [partnerData, setPartnerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLivePreview, setIsLivePreview] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const dropdownRef = useRef(null);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const response = await axios.get('https://prep-pure-k5mw.vercel.app/api/auth/foodpartner/profile', {
          withCredentials: true
        });
        console.log('Partner data response:', response.data);
        if (response.data && response.data.partner && response.data.partner.businessName) {
          setBusinessName(response.data.partner.businessName);
          setPartnerData(response.data.partner);
        } else {
          console.log('Partner data structure:', response.data);
          throw new Error('Invalid partner data structure');
        }
      } catch (error) {
        console.error('Error fetching partner data:', error);
        if (error.response?.status === 401) {
          navigate('/food-partner/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartnerData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('https://prep-pure-k5mw.vercel.app/api/auth/foodpartner/logout', {}, {
        withCredentials: true
      });
      navigate('/food-partner/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const startLivePreview = async () => {
    console.log('Starting live preview...');
    setIsLivePreview(true);
    
    try {
      if (!navigator.mediaDevices) {
        throw new Error('mediaDevices API not available');
      }

      console.log('Requesting camera access...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      console.log('Camera access granted, setting up video element...');
      
      if (!videoRef.current) {
        throw new Error('Video element not found');
      }

      // Store stream first
      streamRef.current = stream;

      // Then set it as source for video element
      videoRef.current.srcObject = stream;

      // Wait for video to be ready
      await new Promise((resolve) => {
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded');
          resolve();
        };
      });

      // Start playing
      await videoRef.current.play();
      console.log('Video started playing');

    } catch (error) {
      console.error('Error in startLivePreview:', error);
      let message = 'Could not access camera. ';
      
      if (error.name === 'NotAllowedError') {
        message += 'Please allow camera access in your browser settings.';
      } else if (error.name === 'NotFoundError') {
        message += 'No camera found. Please connect a camera and try again.';
      } else if (error.name === 'NotReadableError') {
        message += 'Your camera might be in use by another application.';
      } else {
        message += error.message;
      }
      
      alert(message);
      setIsLivePreview(false);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  };

  const stopLivePreview = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsLivePreview(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);



  const activeOrders = [
    {
      id: 1,
      customer: "John Doe",
      items: "Butter Chicken, Naan",
      status: "preparing",
      time: "10 mins ago",
      total: "₹450"
    },
    {
      id: 2,
      customer: "Alice Smith",
      items: "Masala Dosa",
      status: "pending",
      time: "2 mins ago",
      total: "₹120"
    },
    {
      id: 3,
      customer: "Bob Wilson",
      items: "Paneer Tikka, Roti",
      status: "ready",
      time: "15 mins ago",
      total: "₹380"
    }
  ];

  const menuItems = [
    {
      id: 1,
      name: "Paneer Tikka",
      price: "₹250",
      rating: 4.5,
      availability: true,
      image: "/food/food3.jpg"
    },
    {
      id: 2,
      name: "Butter Chicken",
      price: "₹300",
      rating: 4.8,
      availability: true,
      image: "/food/food2.jpg"
    },
    {
      id: 3,
      name: "Dal Makhani",
      price: "₹200",
      rating: 4.3,
      availability: false,
      image: "/food/food3.jpg"
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="partner-welcome">
          <h1>{businessName ? `Welcome, ${businessName}!` : 'Welcome to your dashboard!'}</h1>
          <p>Manage your restaurant and orders</p>
        </div>
        <div className="quick-actions">
          <Link to="/menu-management" className="dashboard-btn">
            <i className="fas fa-plus"></i> Add Menu Item
          </Link>
          <Link to="/live-orders" className="dashboard-btn">
            <i className="fas fa-clock"></i> Live Orders
          </Link>
          <div className="user-menu" ref={dropdownRef}>
            <button 
              className="profile-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <i className="fas fa-user-circle"></i>
              <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/partner-profile" className="dropdown-item">
                  <i className="fas fa-user"></i>
                  Profile
                </Link>
                <Link to="/partner-settings" className="dropdown-item">
                  <i className="fas fa-cog"></i>
                  Settings
                </Link>
                <Link to="/order-history" className="dropdown-item">
                  <i className="fas fa-history"></i>
                  Order History
                </Link>
                <Link to="/food-partner/dashboard/analytics" className="dropdown-item">
                  <i className="fas fa-chart-bar"></i>
                  Analytics
                </Link>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item logout">
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Section - Menu Items */}
        <section className="content-section">
          <div className="section-title">
            <h2>Your Menu</h2>
            <Link to="/menu-management" className="dashboard-btn">Manage Menu</Link>
          </div>
          <div className="food-grid">
            {menuItems.map(item => (
              <div key={item.id} className="food-card">
                <div className="food-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="food-info">
                  <h3>{item.name}</h3>
                  <div className="food-meta">
                    <span>⭐ {item.rating}</span>
                    <span>{item.price}</span>
                  </div>
                  <div className={`availability ${item.availability ? 'available' : 'unavailable'}`}>
                    {item.availability ? 'Available' : 'Unavailable'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Section - Active Orders */}
        <section className="content-section">
          <div className="section-title">
            <h2>Active Orders</h2>
          </div>
          <ul className="order-list">
            {activeOrders.map(order => (
              <li key={order.id} className="order-item">
                <div className="order-details">
                  <div className="order-header">
                    <h3>{order.customer}</h3>
                    <span className={`order-status status-${order.status}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="order-items">{order.items}</p>
                  <div className="order-footer">
                    <span className="order-price">{order.total}</span>
                    <span className="order-time">{order.time}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Live Preview Section */}
      <section className="content-section mt-4">
        <div className="section-title">
          <h2>Going Live</h2>
          <button 
            className="dashboard-btn"
            onClick={isLivePreview ? stopLivePreview : startLivePreview}
          >
            {isLivePreview ? (
              <><i className="fas fa-times"></i> Stop Live</>
            ) : (
              <><i className="fas fa-video"></i> Start Live</>
            )}
          </button>
        </div>
        
        <div className="live-preview-section">
          <h3>Live Preview</h3>
          <div className="preview-container">
            <div className="video-wrapper">
              <div className={`preview-placeholder ${isLivePreview ? 'hidden' : ''}`}>
                <i className="fas fa-video"></i>
                <p>“Go live to receive food orders”</p>
              </div>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`preview-video ${isLivePreview ? 'visible' : ''}`}
                style={{ display: isLivePreview ? 'block' : 'none' }}
                onError={(e) => console.error('Video error:', e)}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FoodPartnerDashboard;