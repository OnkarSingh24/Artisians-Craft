import React, { useState } from 'react';
import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import './navigation.css';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleBecomeSeller = () => {
    navigate('/registerasseller'); // Ensure this path matches your route setup
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="hamburger" onClick={toggleSidebar}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <div className="logo-section">
          <div className="logo-square"><span className="logo-text">AC</span></div>
          <h1 className="brand-name">ARTISIAN'S CRAFT</h1>
        </div>

        <div className="nav-links desktop-only">
          <a href="#" className="nav-link active">Home</a>
          <a href="#" className="nav-link">Shop</a>
          <a href="#" className="nav-link">Artisans</a>
          <a href="#" className="nav-link">About</a>
        </div>

        <div className="search-container desktop-only">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search products..." className="search-input" />
          </div>
        </div>

        <div className="actions">
          <button className="icon-btn"><Heart size={20} /></button>
          <button className="icon-btn"><ShoppingCart size={20} /></button>
          <button className="sign-in-btn desktop-only" onClick={handleSignIn}>
            <User size={18} /><span>Sign In</span>
          </button>
          <button className="seller-btn desktop-only" onClick={handleBecomeSeller}>Become a Seller</button>
        </div>
      </div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">Shop</a>
        <a href="#" className="nav-link">Artisans</a>
        <a href="#" className="nav-link">Order History</a>
        <a href="#" className="nav-link">About</a>
        <button className="sign-in-btn mobile-only" onClick={handleSignIn}>
          <User size={18} /> <span>Sign In</span>
        </button>
        <button className="seller-btn mobile-only" onClick={handleBecomeSeller}>Become a Seller</button>
      </div>

      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </nav>
  );
};

export default Navigation;
