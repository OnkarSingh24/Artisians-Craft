import React, { createContext, useState, useContext, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.name === product.name);
      if (existingItem) {
        return prevItems.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1, price: Number(product.price) }];
      }
    });
  };

  const handleUpdateQuantity = (productName, newQty) => {
    if (newQty < 1) {
      handleRemoveItem(productName);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.name === productName ? { ...item, quantity: newQty } : item
      )
    );
  };
  
  const handleRemoveItem = (productName) => {
    setCartItems(prev => prev.filter(item => item.name !== productName));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const itemCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);
  
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

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