import React from 'react';
import { useWishlist } from './WishlistContext';
import { useCart } from './CartContext';

import { Heart, Star, IndianRupee, ShoppingCart } from 'lucide-react'; 

import './Wishlist.css';


const ProductCard = ({ product, addToCart, addToWishlist, removeFromWishlist, isWishlisted }) => {
  const isLiked = isWishlisted(product.name);

  const handleWishlistToggle = () => {
    if (isLiked) {
      removeFromWishlist(product.name);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="product-card">
      <div className="card-img-wrapper2">
        <img src={product.img} alt={product.name} className="product-image" />
        <button
          className={`likebtn ${isLiked ? 'liked' : ''}`}
          onClick={handleWishlistToggle}
        >
          <Heart size={18} fill={isLiked ? 'red' : 'none'} color={isLiked ? 'red' : '#333'} />
        </button>
        <button className="cart-float-btn" onClick={() => addToCart(product)}>
          <ShoppingCart size={18} /> Add to Cart
        </button>
      </div>
      <div className="card-detail">
        <p className="category">{product.category}</p>
        <h4 className="name">{product.name}</h4>
        <p className="maker">{product.maker}</p>
        <span className="rating">
          <Star color="#fbbf24" fill="#fbbf24" size={16} /> {product.rating}
        </span>
        <div className="last-line">
          <span className="price">
            <IndianRupee size={18} /> {product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

const Wishlist = () => {
  const { wishlistItems, addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="wishlist-page">
      <div className="header">
        <h2>My Wishlist</h2>
        <p>Your collection of favorite handmade items.</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <h3>Your wishlist is empty!</h3>
          <p>Click the heart on any product to save it here.</p>
        </div>
      ) : (
        <div className="product-list">
          {wishlistItems.map(product => (
            <ProductCard
              key={product.name}
              product={product}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              isWishlisted={isWishlisted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;