import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post('http://localhost:3000/api/auth/user/login', 
      { email, password }, { withCredentials: true }
    );
    console.log('User registered successfully:', response.data);
    if (response.data.success) {
      navigate("/");
    } else {
      console.error("Login failed:", response.data.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="form-page">
      <form className="form-card" aria-label="User login form">
        <h1 className="form-title">Welcome back</h1>
        <p className="form-sub">Sign in to your account</p>

        <label className="label">Email
          <input className="input" name="email" type="email" placeholder="your@email.com" required />
        </label>

        <label className="label">Password
          <input className="input" name="password" type="password" placeholder="••••••••" required />
        </label>

        <button type="submit" className="btn">Sign in</button>

        <div className="form-links">
          <Link to="/user/register" className="form-link">Create new account</Link>
          <Link to="/food-partner/login" className="form-link">Login as food partner</Link>
        </div>
      </form>
    </div>
  )
}

export default UserLogin
