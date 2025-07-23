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

      {loading && <p>Loading your cart...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

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
    </div>
  );
};

export default Cart;
