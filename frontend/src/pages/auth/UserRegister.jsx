import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserRegister = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post('http://localhost:3000/api/auth/user/register', 
      { 
        fullName, 
        email, 
        password 
      },{ withCredentials: true }
    )
    
    console.log('User registered successfully:', response.data);
        if (response.data.success) {
      navigate("/");
    } else {
      console.error("Login failed:", response.data.message);
      alert("Registration failed. Please try again.");
    }
    

  }
  
  return (
    <div className="form-page">
      <form className="form-card" aria-label="User register form" onSubmit={handleSubmit}>
        <h1 className="form-title">Create account</h1>
        <p className="form-sub">Join us — “India’s first app where you can watch hygiene happen live!”</p>
        <label className="label">Full name
          <input className="input" name="name" type="text" placeholder="Your Name" required minLength={2} />
        </label>

        <label className="label">Email
          <input className="input" name="email" type="email" placeholder="your@email.com" required />
        </label>

        <label className="label">Password
          <input className="input" name="password" type="password" placeholder="••••••••" required minLength={8} />
        </label>

        <button type="submit" className="btn">Create account</button>

        <div className="form-links">
          <Link to="/user/login" className="form-link">Already have an account?</Link>
          <Link to="/food-partner/register" className="form-link">Register as food partner</Link>
        </div>
      </form>
    </div>
  )
}

export default UserRegister
