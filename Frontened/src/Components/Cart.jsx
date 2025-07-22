import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, Info, Lock, Truck, LoaderCircle } from 'lucide-react';
import './Cart.css'; 

const fetchCartItemsFromAPI = () => {
  return new Promise((resolve) => {
    const isCartEmpty = Math.random() > 0.5;
    
    setTimeout(() => {
      if (isCartEmpty) {
        resolve({ data: [] }); 
      } else {
        resolve({
          data: [
            {
              id: 1,
              name: 'Sterling Silver Pendant',
              artist: 'Priya Sharma',
              category: 'Jewelry',
              price: 65.00,
              quantity: 1,
              image: 'https://placehold.co/100x100/e0e0e0/333?text=Item+1',
            },
            {
              id: 2,
              name: 'Handcrafted Ceramic Mug',
              artist: 'David Green',
              category: 'Pottery',
              price: 28.00,
              quantity: 2,
              image: 'https://placehold.co/100x100/d9ead3/333?text=Item+2',
            },
          ],
        });
      }
    }, 1500); 
  });
};





const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => (
  <div className="cart-item">
    <div className="cart-item-info">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div>
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-artist">by {item.artist}</p>
        <span className="cart-item-category">{item.category}</span>
        <p className="cart-item-price-mobile">${item.price.toFixed(2)}</p>
      </div>
    </div>
    <div className="cart-item-controls">
       <p className="cart-item-price-desktop">${item.price.toFixed(2)}</p>
       <div className="quantity-selector">
        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="quantity-btn">
          <Minus size={16} />
        </button>
        <span className="quantity-display">{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="quantity-btn">
          <Plus size={16} />
        </button>
      </div>
       <p className="cart-item-subtotal">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
    </div>
     <button onClick={() => onRemoveItem(item.id)} className="remove-item-btn">
        <Trash2 size={20} />
      </button>
  </div>
);

const OrderSummary = ({ subtotal, itemCount }) => {
  const shipping = subtotal > 0 ? 8.99 : 0;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;
  const freeShippingThreshold = 75;
  const amountForFreeShipping = freeShippingThreshold - subtotal;

  return (
    <div className="order-summary">
      <h2 className="summary-title">Order Summary</h2>
      <div className="summary-details">
        <div className="summary-row">
          <span>Subtotal ({itemCount} Item{itemCount !== 1 ? 's' : ''})</span>
          <span className="summary-value">${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span className="summary-value">${shipping.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax</span>
          <span className="summary-value">${tax.toFixed(2)}</span>
        </div>
      </div>
      <div className="summary-total-row">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      {subtotal > 0 && subtotal < freeShippingThreshold && (
        <div className="free-shipping-notice">
          <Info size={16} />
          Add <strong>${amountForFreeShipping.toFixed(2)}</strong> more for free shipping!
        </div>
      )}
      <button className="checkout-btn">
        Proceed to Checkout
      </button>
      <div className="secure-info">
        <p><Lock size={14}/> Secure checkout</p>
        <p><Truck size={14}/> Free shipping on orders over ${freeShippingThreshold}</p>
      </div>
    </div>
  );
};

const EmptyCart = ({ onStartShopping }) => (
  <div className="empty-cart-container">
    <div className="empty-cart-icon-wrapper">
      <ShoppingBag size={48} className="empty-cart-icon" />
    </div>
    <h1 className="empty-cart-title">Your Cart is Empty</h1>
    <p className="empty-cart-subtitle">Discover amazing handmade products from talented artisans</p>
    <button onClick={onStartShopping} className="start-shopping-btn">
      Start Shopping
    </button>
    <button className="continue-browsing-link">
      ← Continue browsing
    </button>
  </div>
);

const LoadingSpinner = () => (
    <div className="loading-container">
        <LoaderCircle className="loading-spinner-icon" size={48} />
        <p>Loading Your Cart...</p>
    </div>
);




export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  // Fetch data from the "backend" when the component mounts
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

  
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (itemId) => {
    // Example: api.removeItem(itemId);
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleClearCart = () => {
    // Example: api.clearCart();
    setCartItems([]);
  };

  const handleStartShopping = () => {
      // This is a placeholder. In a real app, you'd navigate to a products page.
      // For this demo, we'll just add one item to the cart.
      const firstItem = {
          id: 3,
          name: 'Hand-Woven Scarf',
          artist: 'Maria Garcia',
          category: 'Textiles',
          price: 42.00,
          quantity: 1,
          image: 'https://placehold.co/100x100/fce8b2/333?text=New+Item',
      };
      setCartItems([firstItem]);
  }

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);
  
  const itemCount = useMemo(() => {
      return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);


  if (loading) {
    return (
        <div className="page-container empty">
            <LoadingSpinner />
        </div>
    );
  }

  if (error) {
      return (
          <div className="page-container empty">
              <div className="error-container">{error}</div>
          </div>
      );
  }

  if (cartItems.length === 0) {
    return (
      <div className="page-container empty">
        <EmptyCart onStartShopping={handleStartShopping} />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="main-content">
        <button className="continue-shopping-link">
          <ArrowLeft size={16} />
          Continue Shopping
        </button>

        <header className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{itemCount} item{itemCount > 1 ? 's' : ''} in your cart</p>
        </header>

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
                    <Trash2 size={16} />
                    Clear Cart
                </button>
                 <button className="add-more-btn">
                    Add More Items
                </button>
            </div>
          </main>
          <aside className="cart-summary-sidebar">
            <OrderSummary subtotal={subtotal} itemCount={itemCount} />
          </aside>
        </div>
      </div>
    </div>
  );
}
