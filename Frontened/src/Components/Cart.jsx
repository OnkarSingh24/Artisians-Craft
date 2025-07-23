<<<<<<< HEAD
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { content } from "../../context"; // adjust path if needed

const Cart = () => {
  const { backendurl } = useContext(content);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  // ✅ Fetch Cart Items from API
  const fetchCartItemsFromAPI = async () => {
    try {
      const response = await axios.get(`${backendurl}/api/cart`, {
        withCredentials: true, // Include cookies if needed for auth
      });

      if (response.data.success) {
        const transformedData = response.data.cart.items.map(item => ({
          id: item.productid._id,
          name: item.productid.name,
          category: item.productid.category,
          price: item.productid.price,
          quantity: item.quantity,
        }));

        return { data: transformedData };
      } else {
        throw new Error("Cart fetch failed");
      }
    } catch (err) {
      throw err;
    }
  };

  // ✅ useEffect to fetch cart when component mounts
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchCartItemsFromAPI()
      .then(response => {
        setCartItems(response.data);
      })
      .catch(err => {
        console.error("Failed to fetch cart items:", err);
        setError("We couldn't load your cart. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="cart-page" style={{ padding: "2rem" }}>
      <h2>Your Cart</h2>
=======
import React, { useState, useMemo } from 'react';
import {
  ShoppingBag, Trash2, Plus, Minus, ArrowLeft, Lock, Truck, AlertCircle
} from 'lucide-react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

// Mock data is used to set the initial state directly
const mockInitialCart = [
  {
    id: 'prod1',
    name: 'Celestial Dreams',
    category: 'Painting',
    price: 3750.00, // Price in INR
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500',
    artist: 'Elena Petrova'
  },
  {
    id: 'prod2',
    name: 'Earthenware Vase',
    category: 'Ceramics',
    price: 2375.00, // Price in INR
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1565330335893-d345a98a8bab?w=500',
    artist: 'Kenji Tanaka'
  }
];

const ErrorDisplay = ({ message, onRetry }) => (
  <div className="error-container">
    <AlertCircle size={48} color="#e53e3e" />
    <h2 className="error-title">Oops! Something went wrong.</h2>
    <p className="error-message">{message}</p>
    <button onClick={onRetry} className="start-shopping-btn">Try Again</button>
  </div>
);

// Empty cart UI (kept as original)
const EmptyCart = ({ onStartShopping }) => (
  <div className="empty-cart-container">
    <div className="empty-cart-icon-wrapper">
      <ShoppingBag size={48} className="empty-cart-icon" />
    </div>
    <h1 className="empty-cart-title">Your Cart is Empty</h1>
    <p className="empty-cart-subtitle">Discover amazing handmade products from talented artisans</p>
    <button onClick={onStartShopping} className="start-shopping-btn">Start Shopping</button>
    <button onClick={onStartShopping} className="continue-Browse-link">← Continue Browse</button>
  </div>
);

// Order Summary (Updated for Rupees and Free Delivery)
const OrderSummary = ({ subtotal, itemCount, onCheckout }) => {
  const shipping = 0; // Free delivery for all orders
  const tax = subtotal * 0.08; // 8% GST
  const total = subtotal + shipping + tax;

  return (
    <div className="order-summary">
      <h2 className="summary-title">Order Summary</h2>
      <div className="summary-details">
        <div className="summary-row">
          <span>Subtotal ({itemCount} Item{itemCount !== 1 ? 's' : ''})</span>
          <span className="summary-value">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span className="summary-value" style={{color: 'green'}}>FREE</span>
        </div>
        <div className="summary-row">
          <span>Tax (GST)</span>
          <span className="summary-value">₹{tax.toFixed(2)}</span>
        </div>
      </div>
      <div className="summary-total-row">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
      <button className="checkout-btn" onClick={onCheckout}>Proceed to Checkout</button>
      <div className="secure-info">
        <p><Lock size={14} /> Secure checkout</p>
        <p><Truck size={14} /> Enjoy Free Shipping On All Orders! 🚚</p>
      </div>
    </div>
  );
};

// Cart Item (Updated for Rupees)
const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => (
  <div className="cart-item">
    <div className="cart-item-info">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div>
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-artist">by {item.artist}</p>
        <span className="cart-item-category">{item.category}</span>
        <p className="cart-item-price-mobile">₹{item.price.toFixed(2)}</p>
      </div>
    </div>
    <div className="cart-item-controls">
      <p className="cart-item-price-desktop">₹{item.price.toFixed(2)}</p>
      <div className="quantity-selector">
        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="quantity-btn"><Minus size={16} /></button>
        <span className="quantity-display">{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="quantity-btn"><Plus size={16} /></button>
      </div>
      <p className="cart-item-subtotal">Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
    </div>
    <button onClick={() => onRemoveItem(item.id)} className="remove-item-btn">
      <Trash2 size={20} />
    </button>
  </div>
);

// Main Cart Component
export default function Cart() {
  const [cartItems, setCartItems] = useState(mockInitialCart);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUpdateQuantity = (itemId, newQty) => {
    if (newQty < 1) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleStartShopping = () => {
    navigate('/shop');
  };

  const handleCheckout = () => {
    alert(`Checkout started with ${itemCount} item(s) for a total of ₹${total.toFixed(2)}`);
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const itemCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);
  
  const total = useMemo(() => {
      const tax = subtotal * 0.08;
      return subtotal + tax; // Shipping is 0
  }, [subtotal]);

  if (error) return <div className="page-container empty"><ErrorDisplay message={error} onRetry={() => window.location.reload()} /></div>;
  if (cartItems.length === 0) return <div className="page-container empty"><EmptyCart onStartShopping={handleStartShopping} /></div>;

  return (
    <div className="page-container">
      <div className="main-content">
        <button className="continue-shopping-link" onClick={handleStartShopping}>
          <ArrowLeft size={16} /> Continue Shopping
        </button>
>>>>>>> aa80005d842a97c9f3191adda409f7c4f367d3d7

      {loading && <p>Loading your cart...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

<<<<<<< HEAD
      {!loading && cartItems.length === 0 && (
        <p>Your cart is empty. Go add something!</p>
      )}

      {!loading && cartItems.length > 0 && (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} style={{ marginBottom: "1rem" }}>
              <strong>{item.name}</strong> — {item.quantity} × ₹{item.price}
              <br />
              <small>Category: {item.category}</small>
            </li>
          ))}
        </ul>
      )}
=======
        <div className="cart-layout">
          <main className="cart-items-list">
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            ))}
            <div className="cart-actions">
              <button onClick={handleClearCart} className="clear-cart-btn">
                <Trash2 size={16} /> Clear Cart
              </button>
            </div>
          </main>
          <aside className="cart-summary-sidebar">
            <OrderSummary subtotal={subtotal} itemCount={itemCount} onCheckout={handleCheckout} />
          </aside>
        </div>
      </div>
>>>>>>> aa80005d842a97c9f3191adda409f7c4f367d3d7
    </div>
  );
};

export default Cart;
