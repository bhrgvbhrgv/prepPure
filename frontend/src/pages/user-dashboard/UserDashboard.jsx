import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDashboard.css';

const UserDashboard = ({userName}) => {
  console.log("Username prop:", userName);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
useEffect(()=>{
if(!userName){
  console.log("No username, redirecting to login");
    navigate('/user/login');
    
  }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('user');
    navigate('/user/login');
    // try {
    //   await axios.post('https://prep-pure-k5mw.vercel.app/api/auth/user/logout', {}, 
    //     { withCredentials: true }
    //   );
    //   navigate('/user/login');
    // } catch (error) {
    //   console.error('Logout error:', error);
    // }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://prep-pure-k5mw.vercel.app/api/auth/user/me', {
          withCredentials: true
        });
        console.log('User data response:', response.data);
        if (response.data && response.data.user && response.data.user.fullName) {
          const firstName = response.data.user.fullName.split(' ')[0];
          console.log('Setting user name to:', firstName);
          setUserName(firstName);
        } else {
          console.log('User data structure:', response.data);
          throw new Error('Invalid user data structure');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 401) {
          navigate('/user/login');
        }
      }
    };

    fetchUserData();
  }, [navigate]);
  const recentOrders = [
    {
      id: 1,
      restaurant: "Spice Garden",
      items: "Butter Chicken, Naan",
      status: "preparing",
      time: "10 mins ago",
      image: "/food/food4.jpg",
      price: "₹450"
    },
    {
      id: 2,
      restaurant: "South Express",
      items: "Masala Dosa",
      status: "delivered",
      time: "Yesterday",
      image: "/food/food2.jpg",
      price: "₹120"
    },
    {
      id: 3,
      restaurant: "Punjab House",
      items: "Paneer Tikka, Roti",
      status: "delivered",
      time: "2 days ago",
      image: "/food/food1.jpg",
      price: "₹380"
    }
  ];

  const recommendedFood = [
    {
      id: 1,
      name: "Paneer Tikka",
      restaurant: "Punjab House",
      price: "₹250",
      rating: 4.5,
      image: "/food/food1.jpg"
    },
    {
      id: 2,
      name: "Biryani",
      restaurant: "Paradise",
      price: "₹300",
      rating: 4.8,
      image: "/food/food2.jpg"
    },
    {
      id: 3,
      name: "Dal Makhani",
      restaurant: "North Flavors",
      price: "₹200",
      rating: 4.3,
      image: "/food/food3.jpg"
    }
  ];
  
  

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="user-welcome">
          <h1>{userName ? `Welcome back, ${userName}!` : 'Welcome back!'}</h1>
          <p>What would you like to eat today?</p>
        </div>
        <div className="quick-actions">
          <Link to="/user/dashboard/liveorder" className="dashboard-btn">
            <i className="fas fa-video"></i> Order from Live Cook
          </Link>
          <Link to="/user/dashboard/foodshots" className="dashboard-btn">Watch FoodShots</Link>

          <Link to="/track" className="dashboard-btn">Track Order</Link>
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
                <Link to="/profile" className="dropdown-item">
                  <i className="fas fa-user"></i>
                  Profile
                </Link>
                <Link to="/settings" className="dropdown-item">
                  <i className="fas fa-cog"></i>
                  Settings
                </Link>
                <Link to="/orders" className="dropdown-item">
                  <i className="fas fa-shopping-bag"></i>
                  My Orders
                </Link>
                <Link to="/feedback" className="dropdown-item">
                  <i className="fas fa-comment"></i>
                  Feedback
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
        {/* Left Section - Recommended Food */}
        <section className="content-section">
          <div className="section-title">
            <h2>Recommended for You</h2>
            <Link to="/explore" className="dashboard-btn">See All</Link>
          </div>
          <div className="food-grid">
            {recommendedFood.map(food => (
              <div key={food.id} className="food-card">
                <img 
                  src={food.image} 
                  alt={food.name} 
                  className="food-image"
                />
                <div className="food-info">
                  <h3>{food.name}</h3>
                  <p>{food.restaurant}</p>
                  <div className="food-meta">
                    <span>⭐ {food.rating}</span>
                    <span>{food.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Section - Recent Orders */}
        <section className="content-section">
          <div className="section-title">
            <h2>Recent Orders</h2>
          </div>
          <ul className="order-list">
            {recentOrders.map(order => (
              <li key={order.id} className="order-item">
                <div className="order-image">
                  <img src={order.image} alt={order.items} />
                </div>
                <div className="order-details">
                  <div className="order-header">
                    <h3>{order.restaurant}</h3>
                    <span className={`order-status status-${order.status}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="order-items">{order.items}</p>
                  <div className="order-footer">
                    <span className="order-price">{order.price}</span>
                    <span className="order-time">{order.time}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;