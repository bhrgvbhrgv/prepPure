import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const business = e.target.business.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://localhost:3000/api/auth/foodpartner/register',
        {
          name: business,  // Changed to match backend expectation
          contactName,
          phone,
          address,
          email,
          password
        }, 
        { withCredentials: true }
      );

      console.log('Registration response:', response.data);
      
      console.log('User registered and logged in successfully');
        navigate("/food-partner/login");
      } catch (loginError) {
      console.error("Auto-login failed:", loginError.response?.data?.message);
        // If auto-login fails, redirect to login page with a message
        navigate("/food-partner/login", { 
          state: { 
            message: "Registration successful! Please log in with your credentials." 
          }
        });
      }
  };

  return (
    <div className="form-page">
      <form className="form-card" aria-label="Food partner register form" onSubmit={handleSubmit}>
        <h1 className="form-title">Partner sign up</h1>
        <p className="form-sub">Create your partner account</p>

        <label className="label">Business name
          <input className="input" name="business" type="text" placeholder="Your restaurant" required minLength={2} />
        </label>

        <div className="form-row">
          <label className="label">Contact person name
            <input className="input" name="contactName" type="text" placeholder="Full name" required minLength={2} />
          </label>

          <label className="label">Phone number
            <input className="input" name="phone" type="tel" placeholder="Contact number" required pattern="[0-9]{10}" />
          </label>
        </div>

        <label className="label">Business address
          <textarea className="input" name="address" placeholder="Complete business address" rows="2" required minLength={10}></textarea>
        </label>

        <div className="form-row">
          <label className="label">Contact email
            <input className="input" name="email" type="email" placeholder="your@email.com" required />
          </label>

          <label className="label">Password
            <input className="input" name="password" type="password" placeholder="••••••••" required minLength={8} />
          </label>
        </div>

        <button type="submit" className="btn">Create account</button>

        <div className="form-links">
          <Link to="/food-partner/login" className="form-link">Already have a partner account?</Link>
          <Link to="/user/register" className="form-link">Register as user</Link>
        </div>
      </form>
    </div>
  )
}

export default FoodPartnerRegister
