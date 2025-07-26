import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, subtotal, handleClearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: '',
    upiId: '',          
    cardNumber: '',    
    expiryDate: '',    
    cvv: ''            
  });

  const tax = subtotal * 0.08; // 8% GST
  const totalAmount = subtotal + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before placing an order.');
      navigate('/shop');
      return;
    }

    const { name, address, phone, paymentMethod, ...paymentDetails } = formData;
    const orderData = {
      customerDetails: { name, address, phone },
      paymentMethod,
      orderedItems: cartItems,
      totalAmount: totalAmount.toFixed(2)
    };

    if (paymentMethod === 'upi') {
      orderData.paymentDetails = { upiId: paymentDetails.upiId };
    } else if (paymentMethod === 'card') {
      orderData.paymentDetails = { 
        cardNumber: paymentDetails.cardNumber,
        expiryDate: paymentDetails.expiryDate,
       
      };
    }
    
    console.log('Order Placed:', orderData);
    alert('Thank you! Your order has been placed successfully!');
    
    handleClearCart();
    navigate('/'); 
  };


  const renderPaymentDetails = () => {
    switch (formData.paymentMethod) {
      case 'upi':
        return (
          <div className="payment-details">
            <input
              type="text"
              name="upiId"
              placeholder="Enter UPI ID (e.g., yourname@okhdfcbank)"
              value={formData.upiId}
              onChange={handleChange}
              required
            />
          </div>
        );
      case 'card':
        return (
          <div className="payment-details">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
              pattern="\d{16}"
              title="Card number must be 16 digits"
              required
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleChange}
              pattern="(0[1-9]|1[0-2])\/\d{2}"
              title="Enter date in MM/YY format"
              required
            />
            <input
              type="password"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              pattern="\d{3}"
              title="CVV must be 3 digits"
              maxLength="3"
              required
            />
          </div>
        );
      default:
        return null; 
    }
  };

  return (
    <div className="checkout-wrapper">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-container">
       
        <div className="checkout-left">
          <h3>Order Summary</h3>
          {cartItems.length === 0 ? (
            <p className="empty-msg">Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item, i) => (
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

            
            {renderPaymentDetails()}

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