import React, { createContext, useState, useContext, useMemo } from 'react';

// 1. Create the context
const CartContext = createContext();

// 2. Create a custom hook for easy access to the context
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Create the Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add a product to the cart
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if the item is already in the cart
      const existingItem = prevItems.find(item => item.name === product.name);
      if (existingItem) {
        // If it exists, increase the quantity
        return prevItems.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If it's a new item, add it to the cart with quantity 1
        // We also parse the price to ensure it's a number
        return [...prevItems, { ...product, quantity: 1, price: Number(product.price) }];
      }
    });
  };

  // Update item quantity in the cart
  const handleUpdateQuantity = (productName, newQty) => {
    if (newQty < 1) {
      handleRemoveItem(productName); // Remove if quantity is less than 1
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.name === productName ? { ...item, quantity: newQty } : item
      )
    );
  };
  
  // Remove an item from the cart
  const handleRemoveItem = (productName) => {
    setCartItems(prev => prev.filter(item => item.name !== productName));
  };

  // Clear the entire cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // --- Memoized values for performance ---

  // Calculate total number of items
  const itemCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);
  
  // Calculate subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  // Provide the state and functions to children
  const value = {
    cartItems,
    addToCart,
    itemCount,
    subtotal,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};