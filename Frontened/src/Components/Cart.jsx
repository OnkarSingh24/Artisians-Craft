import React from 'react';
import {
  ShoppingBag, Trash2, Plus, Minus, ArrowLeft, Lock, Truck, AlertCircle
} from 'lucide-react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Import the useCart hook

// The EmptyCart and ErrorDisplay components remain the same
const EmptyCart = ({ onStartShopping }) => (
  <div className="empty-cart-container">
    <div className="empty-cart-icon-wrapper">
      <ShoppingBag size={48} className="empty-cart-icon" />
    </div>
    <h1 className="empty-cart-title">Your Cart is Empty</h1>
    <p className="empty-cart-subtitle">Discover amazing handmade products from talented artisans</p>
    <button onClick={onStartShopping} className="start-shopping-btn">Start Shopping</button>
  </div>
);

// OrderSummary now gets its props from the main Cart component
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

// CartItem's functions are passed down from the main Cart component
const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => (
  <div className="cart-item">
    <div className="cart-item-info">
      <img src={item.image || item.img} alt={item.name} className="cart-item-image" />
      <div>
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-artist">by {item.artist || item.maker}</p>
        <span className="cart-item-category">{item.category}</span>
        <p className="cart-item-price-mobile">₹{item.price.toFixed(2)}</p>
      </div>
    </div>
    <div className="cart-item-controls">
      <p className="cart-item-price-desktop">₹{item.price.toFixed(2)}</p>
      <div className="quantity-selector">
        <button onClick={() => onUpdateQuantity(item.name, item.quantity - 1)} className="quantity-btn"><Minus size={16} /></button>
        <span className="quantity-display">{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.name, item.quantity + 1)} className="quantity-btn"><Plus size={16} /></button>
      </div>
      <p className="cart-item-subtotal">Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
    </div>
    <button onClick={() => onRemoveItem(item.name)} className="remove-item-btn">
      <Trash2 size={20} />
    </button>
  </div>
);


// Main Cart Component
export default function Cart() {
  // Get all cart data and functions from the useCart hook
  const {
    cartItems,
    itemCount,
    subtotal,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart
  } = useCart();

  const navigate = useNavigate();

  const handleStartShopping = () => {
    navigate('/shop');
  };

  const handleCheckout = () => {
   
    navigate('/checkout');
  };

  // If the cart is empty, show the EmptyCart component
  if (cartItems.length === 0) {
    return (
      <div className="page-container empty">
        <EmptyCart onStartShopping={handleStartShopping} />
      </div>
    );
  }

  // Otherwise, display the cart with its items
  return (
    <div className="page-container">
      <div className="main-content">
        <button className="continue-shopping-link" onClick={handleStartShopping}>
          <ArrowLeft size={16} /> Continue Shopping
        </button>
        <header className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{itemCount} item{itemCount > 1 ? 's' : ''} in your cart</p>
        </header>

        <div className="cart-layout">
          <main className="cart-items-list">
            {/* Map over the cartItems from the context to display each one */}
            {cartItems.map(item => (
              <CartItem
                key={item.name} // Use a unique product identifier
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
            <OrderSummary
              subtotal={subtotal}
              itemCount={itemCount}
              onCheckout={handleCheckout}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}