import React, { useState } from 'react';
import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import './navigation.css';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">

        {/* Hamburger on left */}
        <div className="hamburger" onClick={toggleSidebar}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        {/* Logo */}
        <div className="logo-section">
          <div className="logo-square"><span className="logo-text">AC</span></div>
          <h1 className="brand-name">ARTISIAN'S CRAFT</h1>
        </div>

        {/* Nav Links*/}
        <div className="nav-links desktop-only">
          <a href="#" className="nav-link active">Home</a>
          <a href="#" className="nav-link">Shop</a>
          <a href="#" className="nav-link">Artisans</a>
          <a href="#" className="nav-link">About</a>
        </div>

        {/* Search (desktop only) */}
        <div className="search-container desktop-only">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search products..." className="search-input" />
          </div>
        </div>

        {/* Actions */}
        <div className="actions">
          <button className="icon-btn"><Heart size={20} /></button>
          <button className="icon-btn"><ShoppingCart size={20} /></button>
          <button className="sign-in-btn desktop-only"><User size={18} /><span>Sign In</span></button>
          <button className="seller-btn desktop-only">Become a Seller</button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">Shop</a>
        <a href="#" className="nav-link">Artisans</a>
        <a href="#" className="nav-link">Order History</a>
        <a href="#" className="nav-link">About</a>
        <button className="sign-in-btn mobile-only"><User size={18} /> <span>Sign In</span></button>
        <button className="seller-btn mobile-only">Become a Seller</button>
      </div>

      {/* Overlay */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </nav>
  );
};

export default Navigation;
