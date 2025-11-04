import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegister from '../pages/auth/UserRegister.jsx'
import UserLogin from '../pages/auth/UserLogin.jsx'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister.jsx'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin.jsx'
import Home from '../pages/general/Home.jsx';



import UserDashboard from '../pages/user-dashboard/UserDashboard.jsx';

import FoodShots from '../pages/user-dashboard/FoodShots.jsx';

import FoodPartnerDashboard from '../pages/food-partner-dashboard/FoodPartnerDashboard.jsx';

import CreateFood from '../pages/food-partner-dashboard/CreateFood.jsx';

import FoodPartnerAnalytics from '../pages/food-partner-dashboard/FoodPartnerAnalytics.jsx';



const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />

        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />

        <Route path="/" element={<Home />} />

        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/dashboard/foodshots" element={<FoodShots />} />

        <Route path="/food-partner/dashboard" element={<FoodPartnerDashboard />} /> 
        <Route path="/food-partner/dashboard/create-food" element={<CreateFood />} />
        <Route path="/food-partner/dashboard/analytics" element={<FoodPartnerAnalytics />} />

      </Routes>
    </Router>
  )
}

export default AppRoutes