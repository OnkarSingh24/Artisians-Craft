import React, { createContext, useContext, useState } from 'react';
import './Checkout.css';
import { Link } from 'react-router-dom';

// ✅ Local Context Creation
const CartContext = createContext();

// ✅ Local Provider Component
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
    {
      title: "Handmade Vase",
      image: "https://via.placeholder.com/100",
      quantity: 2,
      price: 500
    },
    {
      title: "Clay Mug",
      image: "https://via.placeholder.com/100",
      quantity: 1,
      price: 200
    }
  ]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Main Checkout Page
const CheckoutContent = () => {
  const { cartItems } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: ''
  });

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before placing an order.');
      return;
    }

    alert('Order placed successfully!');
    console.log('Order Data:', {
      ...formData,
      cartItems,
      totalAmount
    });
  };

  return (
    <div className="checkout-wrapper">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-container">
        {/* Left: Cart Summary */}
        <div className="checkout-left">
          <h3>Your Cart</h3>
          {cartItems.length === 0 ? (
            <p className="empty-msg">Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item, i) => (
                <div className="checkout-item" key={i}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <h4>{item.title}</h4>
                    <p>Qty: {item.quantity}</p>
                    <p>
                      ₹{item.price} x {item.quantity} = ₹
                      {item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
              <div className="checkout-total">
                <strong>Total: ₹{totalAmount.toFixed(2)}</strong>
              </div>
            </>
          )}
        </div>

        {/* Right: Address & Payment */}
        <div className="checkout-right">
          <h3>Shipping & Payment</h3>
          <form onSubmit={handlePlaceOrder}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <textarea
              name="address"
              placeholder="Shipping Address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="cod">Cash on Delivery</option>
              <option value="upi">UPI</option>
              <option value="card">Credit/Debit Card</option>
            </select>
            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ✅ Export the whole component wrapped in CartProvider
const Checkout = () => (
  <CartProvider>
    <CheckoutContent />
  </CartProvider>
);

export default Checkout;
