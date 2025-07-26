import React, { createContext, useState, useContext } from 'react';

// 1. Create the context
const WishlistContext = createContext();

// 2. Create a custom hook for easy access
export const useWishlist = () => useContext(WishlistContext);

// 3. Create the provider component
export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Add an item to the wishlist
  const addToWishlist = (product) => {
    // Prevent duplicates
    if (!wishlistItems.some(item => item.name === product.name)) {
      setWishlistItems(prevItems => [...prevItems, product]);
    }
  };

  // Remove an item from the wishlist
  const removeFromWishlist = (productName) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.name !== productName));
  };

  // Check if an item is already in the wishlist
  const isWishlisted = (productName) => {
    return wishlistItems.some(item => item.name === productName);
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};