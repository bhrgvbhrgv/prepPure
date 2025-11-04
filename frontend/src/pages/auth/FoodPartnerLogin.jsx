import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await axios.post('http://localhost:3000/api/auth/food-partner/login',
      { email, password }, { withCredentials: true }
    );
    console.log('Food partner logged in successfully:', response.data);
    if (response.data.success) {
      navigate("/create-food");
    } else {
      console.error("Login failed:", response.data.message);
      alert("Login failed. Please check your credentials.");
    }
  };
  return (
    <div className="form-page">
      <form className="form-card" aria-label="Food partner login form">
        <h1 className="form-title">Partner sign in</h1>
        <p className="form-sub">Access your partner dashboard</p>

        <label className="label">Email
          <input className="input" name="email" type="email" placeholder="your@email.com" required />
        </label>

        <label className="label">Password
          <input className="input" name="password" type="password" placeholder="••••••••" required />
        </label>

        <button type="submit" className="btn">Sign in</button>

        <div className="form-links">
          <Link to="/food-partner/register" className="form-link">Create new partner account</Link>
          <Link to="/user/login" className="form-link">Login as user</Link>
        </div>
      </form>
    </div>
  )
}

export default FoodPartnerLogin
