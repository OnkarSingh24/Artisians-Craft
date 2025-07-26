import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import {
  FaBoxOpen, FaCreditCard, FaUser,
  FaHeart, FaEnvelope, FaCogs,
  FaBell, FaEye
} from 'react-icons/fa';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  // Fetch user details from backend
  useEffect(() => {
    axios.get('/api/user')
      .then(res => {
        const data = res.data || {};
        setUser({
          name: data.name || 'User',
          email: data.email || 'user@example.com',
          memberSince: data.memberSince || 'N/A',
          city: data.city || 'Unknown',
          isPremium: data.isPremium || false,
          totalOrders: data.totalOrders || 0,
          totalSpent: data.totalSpent || 0,
          orders: Array.isArray(data.orders) ? data.orders : []
        });
      })
      .catch(err => console.error('Failed to fetch user:', err));
  }, []);

  const tabs = [
    { label: 'Profile', icon: <FaUser /> },
    { label: 'Orders', icon: <FaBoxOpen /> },
    { label: 'Wishlist', icon: <FaHeart /> },
    { label: 'Messages', icon: <FaEnvelope /> },
    { label: 'Settings', icon: <FaCogs /> },
    { label: 'Notifications', icon: <FaBell /> }
  ];

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="user-info-card">
        <div className="user-details">
          <div className="profile-pic-placeholder" />
          <div>
            <h2>Welcome back, {user.name}!</h2>
            <p>{user.email}</p>
            <p>Member since {user.memberSince} · {user.city}</p>
          </div>
          {user.isPremium && <span className="premium-badge">Premium Member</span>}
        </div>

        <div className="user-stats">
          <div className="stat-card">
            <FaBoxOpen />
            <div>
              <p>Total Orders</p>
              <h3>{user.totalOrders}</h3>
            </div>
          </div>
          <div className="stat-card">
            <FaCreditCard />
            <div>
              <p>Total Spent</p>
              <h3>${user.totalSpent}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        {tabs.map((tab, idx) => (
          <button key={idx} className="tab-button">
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="order-section">
        <div className="order-tabs">
          <button className="active-tab">Order History</button>
          <button>Recent Activity</button>
          <button>For You</button>
        </div>

        <div className="order-history">
          <div className="order-header">
            <div>
              <h3>Order History</h3>
              <p>Track and manage your recent purchases</p>
            </div>
            <div className="search-filter">
              <input type="text" placeholder="Search orders..." />
              <button className="filter-button">All Orders</button>
            </div>
          </div>

          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Artisan</th>
                <th>Items</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(user.orders || []).length > 0 ? (
                user.orders.map((order, idx) => (
                  <tr key={order.id || idx}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.artisan}</td>
                    <td>{order.items}</td>
                    <td>
                      <span className={`status ${order.status?.toLowerCase().replace(" ", "-")}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>${order.total?.toFixed(2)}</td>
                    <td>
                      <button className="view-details"><FaEye /> View Details</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
