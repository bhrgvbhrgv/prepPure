import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const UserLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const email = e.target.email.value;
    const password = e.target.password.value;

 

    try {
      const response = await axios.post('https://prep-pure-rocy.vercel.app/api/auth/user/login', 
        { email, password }, 
        { withCredentials: true }
      );
      
      console.log('Login successful:', response.data);
      // Successful login should redirect to the home page or dashboard
      navigate("/user/dashboard");  // Changed from /user/dashboard to / since that's likely the main app route
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-page">
      <form className="form-card" aria-label="User login form" onSubmit={handleSubmit}>
        <h1 className="form-title">Welcome back</h1>
        <p className="form-sub">Sign in to your account</p>

        <label className="label">Email
          <input 
            className="input" 
            name="email" 
            type="email" 
            placeholder="your@email.com" 
            required 
            disabled={isLoading}
          />
        </label>

        <label className="label">Password
          <input 
            className="input" 
            name="password" 
            type="password" 
            placeholder="••••••••" 
            required 
            disabled={isLoading}
          />
        </label>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>

        <div className="form-links">
          <Link to="/user/register" className="form-link">Create new account</Link>
          <Link to="/food-partner/login" className="form-link">Login as food partner</Link>
        </div>
      </form>
    </div>
  )
}

export default UserLogin
