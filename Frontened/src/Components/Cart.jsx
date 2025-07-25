import React, { useEffect, useState, useMemo, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { content } from "../../context.jsx";
import {
  ShoppingBag, Trash2, Plus, Minus, ArrowLeft, Lock, Truck, AlertCircle
} from 'lucide-react';
import './Cart.css';


const ErrorDisplay = ({ message, onRetry }) => (
  <div className="error-container">
    <AlertCircle size={48} color="#e53e3e" />
    <h2 className="error-title">Oops! Something went wrong.</h2>
    <p className="error-message">{message}</p>
    <button onClick={onRetry} className="start-shopping-btn">Try Again</button>
  </div>
);

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

const OrderSummary = ({ subtotal, itemCount, onCheckout }) => {
  const shipping = 0;
  const tax = subtotal * 0.08;
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
          <span className="summary-value" style={{ color: 'green' }}>FREE</span>
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
      <button className="clearcart-btn">onclick={handleclearcart} Clear cart</button>
      <div className="secure-info">
        <p><Lock size={14} /> Secure checkout</p>
        <p><Truck size={14} /> Enjoy Free Shipping On All Orders! 🚚</p>
      </div>
    </div>
  );
};

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => (
  <div className="cart-item">
    <div className="cart-item-info">
      <img src={item.image || "https://via.placeholder.com/150"} alt={item.name} className="cart-item-image" />
      <div>
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-artist">by {item.artist || "Unknown"}</p>
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

export default function Cart() {
  const { backendurl } = useContext(content);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${backendurl}/api/cart/getcart`, { withCredentials: true })
      .then(res => {
        console.log("Raw response from cart API:", res.data);
        if (res.data.success) {
        const transformed = res.data.cart.items.map(item => {
          if (!item.productid || typeof item.productid !== 'object') {
            console.error("Missing or invalid productid in item:", item);
          }

          return {
            id: item.productid?._id,
            name: item.productid?.name,
            category: item.productid?.category,
            price: item.productid?.price,
            quantity: item.quantity,
            image: item.productid?.image,
            artist: item.productid?.artist
          };
        });
        console.log("Transformed cart items:", transformed);
          setCartItems(transformed);
          console.log(res.data);
        } else {
          throw new Error("Failed to load cart");
        }
      })
      .catch(err => {
        setError("Failed to load cart data.");
      });
  }, []);

  const handleUpdateQuantity = async(itemId, newQty) => {
    if (newQty < 1) return handleRemoveItem(itemId);
    try {
      const res =await axios.post(`${backendurl}/api/cart/update` ,{
        productid: itemId ,
        quantity :newQty
      }, {withCredentials: true});
if(res.data.success){
     setCartItems(prev =>
      prev.map(item => item.id === itemId ? { ...item, quantity: newQty } : item) );
    }
    } catch (error) {
     console.log("failed to update cart" , error); 
    }
    
    
  };

  const handleRemoveItem = async(itemId) => {

    try {
      const res =await axios.delete(`${backendurl}/api/cart/deleteitem/${itemId}`);
      if(res.data.success){
        setCartItems(prev => prev.filter(item => item.id !== itemId));
      }
    } catch (error) {
     console.log("Failed to remove item" , error); 
    }
    
  };
  const handleclearcart =async()=>{
    try {
      const res =await axios.delete(`${backendurl}/api/cart/clear`);
      if(res.data.success){
        setCartItems([]);
      }
    } catch (error) {
     console.error("failed to clear cart" ,error); 
    }
  }

  const subtotal = useMemo(() =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  , [cartItems]);

  const itemCount = useMemo(() =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0)
  , [cartItems]);

  const handleStartShopping = () => navigate('/shop');
  const handleCheckout = () => alert(`Checkout started for ₹${subtotal.toFixed(2)}`);

  if (error) return <ErrorDisplay message={error} onRetry={() => window.location.reload()} />;
  if (cartItems.length === 0) return <EmptyCart onStartShopping={handleStartShopping} />;

  return (
    <div className="page-container">
      <div className="main-content">
        <button className="continue-shopping-link" onClick={handleStartShopping}>
          <ArrowLeft size={16} /> Continue Shopping
        </button>
        <div className="cart-layout">
          <main className="cart-items-list">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />
            ))}
          </main>
          <aside className="cart-summary-sidebar">
            <OrderSummary subtotal={subtotal} itemCount={itemCount} onCheckout={handleCheckout} />
          </aside>
        </div>
      </div>
    </div>
  );
}
