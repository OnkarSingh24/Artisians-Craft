import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // 1. Import the GLOBAL useCart hook
import './Checkout.css';

const Checkout = () => {
  // 2. Get the actual cart data from the global context
  const { cartItems, subtotal, handleClearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: ''
  });

  // 3. Calculate total amount including tax, just like in the cart
  const tax = subtotal * 0.08; // 8% GST
  const totalAmount = subtotal + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before placing an order.');
      navigate('/shop'); // Redirect to shop if cart is empty
      return;
    }

    // Log the final order data
    console.log('Order Placed:', {
      customerDetails: formData,
      orderedItems: cartItems,
      totalAmount: totalAmount.toFixed(2)
    });

    alert('Thank you! Your order has been placed successfully!');
    
    // Clear the cart and redirect to home or an order confirmation page
    handleClearCart();
    navigate('/'); 
  };

  return (
    <div className="checkout-wrapper">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-container">
        {/* Left: Cart Summary */}
        <div className="checkout-left">
          <h3>Order Summary</h3>
          {cartItems.length === 0 ? (
            <p className="empty-msg">Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item, i) => (
                // 4. Use the correct property names: 'img' and 'name'
                <div className="checkout-item" key={i}>
                  <img src={item.img} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                    <p>
                      ₹{item.price.toFixed(2)} x {item.quantity} = ₹
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="checkout-subtotal">
                <p>Subtotal: <span>₹{subtotal.toFixed(2)}</span></p>
                <p>Tax (8%): <span>₹{tax.toFixed(2)}</span></p>
              </div>
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
              rows="4"
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

export default Checkout;