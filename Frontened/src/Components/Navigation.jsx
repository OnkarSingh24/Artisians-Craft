import React, { useState, useContext } from 'react';
import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import './Navigation.css';
import { useCart } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { NavContext, NavProvider } from './NavContext';

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(NavContext);
  const { itemCount } = useCart();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleSignIn = () => {
    navigate('/signin');
    closeSidebar();
  };

  const handleBecomeSeller = () => {
    navigate('/registerasseller');
    closeSidebar();
  };

  const handleCartClick = () => {
    navigate('/cart');
    closeSidebar();
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
    closeSidebar();
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="hamburger" onClick={toggleSidebar}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <div className="logo-section">
          <div className="logo-square"><span className="logo-text">CA</span></div>
          <h1 className="brand-name">CraftiArts</h1>
        </div>

        <div className="nav-links desktop-only">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Shop</Link>
          <Link to="/artisans" className="nav-link">Artisans</Link>
          <Link to="/about" className="nav-link">About</Link>
        </div>

        <div className="search-container desktop-only">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search products..." className="search-input" />
          </div>
        </div>

        <div className="actions">
          <Link to="/wishlist" className="icon-btn"><Heart size={20} /></Link>
          <button className="icon-btn cart-icon-wrapper" onClick={handleCartClick}>
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="cart-item-count">{itemCount}</span>
            )}
          </button>

          {user ? (
            <button className="icon-btn" /* ... */ >
              <User size={20} />
            </button>
          ) : (
            
            <Link to="/signin" className="sign-in-btn desktop-only">
              <User size={18} /><span>Sign In</span>
            </Link>
          )}

          <button className="seller-btn desktop-only" onClick={handleBecomeSeller}>Become a Seller</button>
        </div>
      </div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={closeSidebar}>Home</Link>
        <Link to="/shop" className="nav-link" onClick={closeSidebar}>Shop</Link>
        <Link to="/artisans" className="nav-link" onClick={closeSidebar}>Artisans</Link>
        <Link to="/dashboard" className="nav-link" onClick={closeSidebar}>Dashboard</Link>
        <Link to="/orders" className="nav-link" onClick={closeSidebar}>Order History</Link>
        <Link to="/about" className="nav-link" onClick={closeSidebar}>About</Link>

        {user ? (
          <button className="sign-in-btn mobile-only" onClick={handleDashboardClick}>
            <User size={18} /><span>Dashboard</span>
          </button>
        ) : (
          
          <Link to="/signin" className="sign-in-btn mobile-only" onClick={closeSidebar}>
            <User size={18} /><span>Sign In</span>
          </Link>
        )}

        <button className="seller-btn mobile-only" onClick={handleBecomeSeller}>Become a Seller</button>
      </div>

      {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}
    </nav>
  );
};

export default Navigation;