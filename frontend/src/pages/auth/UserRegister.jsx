import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    setIsLoading(true);
    setError('');
    e.preventDefault();

    const fullName = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // First register the user
      const registerResponse = await axios.post('https://prep-pure-rocy.vercel.app/api/auth/user/register', 
        { 
          fullName, 
          email, 
          password 
        },
        { withCredentials: true }
      );

      // If we got a response (no error thrown), proceed with login
      try {
        // Attempt to login immediately after registration
        const loginResponse = await axios.post('https://prep-pure-rocy.vercel.app/api/auth/user/login',
          {
            email,
            password
          },
          { withCredentials: true }
        );

        console.log('User registered and logged in successfully');
        navigate("/user/login");
      } catch (loginError) {
        console.error("Auto-login failed:", loginError.response?.data?.message);
        // If auto-login fails, redirect to login page with a message
        navigate("/user/login", { 
          state: { 
            message: "Registration successful! Please log in with your credentials." 
          }
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
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

        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>

        <div className="form-links">
          <Link to="/user/login" className="form-link">Already have an account?</Link>
          <Link to="/food-partner/register" className="form-link">Register as food partner</Link>
        </div>
      </form>
    </div>
  )
}

export default UserRegister
