import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const FoodPartnerLogin = () => {
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
      const response = await axios.post('https://prep-pure-rocy.vercel.app/api/auth/foodpartner/login', 
        { email, password }, 
        { withCredentials: true }
      );
      
      console.log('Login successful:', response.data);
      navigate("/food-partner/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="form-page">
      <form className="form-card" aria-label="Food partner login form" onSubmit={handleSubmit}>
        <h1 className="form-title">Partner sign in</h1>
        <p className="form-sub">Access your partner dashboard</p>

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
          <Link to="/food-partner/register" className="form-link">Create new partner account</Link>
          <Link to="/user/login" className="form-link">Login as user</Link>
        </div>
      </form>
    </div>
  )
}

export default FoodPartnerLogin
