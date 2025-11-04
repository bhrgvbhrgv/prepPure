import React, { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area,
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts';
import './FoodPartnerAnalytics.css';

const FoodPartnerAnalytics = () => {
  // Sample data - replace with real data from your backend
  const revenueData = [
    { name: 'Mon', revenue: 4500 },
    { name: 'Tue', revenue: 5300 },
    { name: 'Wed', revenue: 4900 },
    { name: 'Thu', revenue: 6000 },
    { name: 'Fri', revenue: 7200 },
    { name: 'Sat', revenue: 8500 },
    { name: 'Sun', revenue: 7800 }
  ];

  const orderData = [
    { name: 'Mon', orders: 45 },
    { name: 'Tue', orders: 52 },
    { name: 'Wed', orders: 48 },
    { name: 'Thu', orders: 61 },
    { name: 'Fri', orders: 73 },
    { name: 'Sat', orders: 85 },
    { name: 'Sun', orders: 78 }
  ];

  const popularItems = [
    { name: 'Butter Chicken', value: 35 },
    { name: 'Paneer Tikka', value: 25 },
    { name: 'Dal Makhani', value: 20 },
    { name: 'Naan', value: 15 },
    { name: 'Biryani', value: 30 }
  ];

  const hourlyOrders = [
    { hour: '10 AM', orders: 5 },
    { hour: '11 AM', orders: 8 },
    { hour: '12 PM', orders: 15 },
    { hour: '1 PM', orders: 25 },
    { hour: '2 PM', orders: 18 },
    { hour: '3 PM', orders: 12 },
    { hour: '4 PM', orders: 8 },
    { hour: '5 PM', orders: 10 },
    { hour: '6 PM', orders: 20 },
    { hour: '7 PM', orders: 28 },
    { hour: '8 PM', orders: 22 },
    { hour: '9 PM', orders: 15 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Analytics cards data
  const cards = [
    {
      title: 'Total Revenue',
      value: '₹43,200',
      change: '+12.5%',
      isPositive: true
    },
    {
      title: 'Total Orders',
      value: '442',
      change: '+8.2%',
      isPositive: true
    },
    {
      title: 'Average Order Value',
      value: '₹97.7',
      change: '+4.3%',
      isPositive: true
    },
    {
      title: 'Customer Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      isPositive: true
    }
  ];

  return (
    <div className="analytics-container">
      <header className="analytics-header">
        <h1>Dashboard Analytics</h1>
        <div className="date-filter">
          <select defaultValue="week">
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </header>

      {/* Analytics Cards */}
      <div className="analytics-cards">
        {cards.map((card, index) => (
          <div className="analytics-card" key={index}>
            <div className="card-content">
              <h3>{card.title}</h3>
              <div className="card-value">{card.value}</div>
              <div className={`card-change ${card.isPositive ? 'positive' : 'negative'}`}>
                {card.change}
                <i className={`fas fa-arrow-${card.isPositive ? 'up' : 'down'}`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Revenue Trend */}
        <div className="chart-container">
          <h2>Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.3} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Trend */}
        <div className="chart-container">
          <h2>Orders Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#82ca9d" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Popular Items */}
        <div className="chart-container">
          <h2>Popular Items</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={popularItems}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {popularItems.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Order Distribution */}
        <div className="chart-container">
          <h2>Hourly Order Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#ff7f50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerAnalytics;