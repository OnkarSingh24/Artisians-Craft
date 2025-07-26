import React, { useState, useEffect } from 'react';
import './Shop.css';
import { Search, Filter, X } from 'lucide-react';
import { Heart, Star, IndianRupee, ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';

const Dropdown = ({ onSortChange, currentSort }) => {
  return (
    <select value={currentSort} onChange={(e) => onSortChange(e.target.value)} className="dropdown">
      <option value="Featured">Featured</option>
      <option value="Newest">Newest</option>
      <option value="Price : Low to High">Price : Low to High</option>
      <option value="Price : High to Low">Price : High to Low</option>
      <option value="Top Rated">Top Rated</option>
    </select>
  );
};

const products = [
  {
    id: 1,
    name: "Handcrafted Ceramic Vase",
    maker: "by Priya Sharma",
    rating: 5,
    reviews: 23,
    price: 8090,
    category: "Pottery & Ceramics",
    img: "https://i.pinimg.com/736x/0e/53/ce/0e53ceddd5f463bf767ea4e93af91d87.jpg",
    featured: true,
  },
  {
    id: 2,
    name: "Boho Clay Wall Hanging",
    maker: "by Aarav Gupta",
    rating: 4.5,
    reviews: 12,
    price: 4050,
    category: "Home Decor",
    img: "https://i.etsystatic.com/9031043/r/il/d02877/6921340460/il_600x600.6921340460_a6wl.jpg",
    featured: false,
  },
  {
    id: 3,
    name: "Handwoven Cotton Scarf",
    maker: "by Ananya Patel",
    rating: 4.8,
    reviews: 30,
    price: 3500,
    category: "Textiles",
    img: "https://i.pinimg.com/1200x/3e/7e/da/3e7eda8873753f63411c68e8baabc5d2.jpg",
    featured: true,
  },
  {
    id: 4,
    name: "Wooden Serving Tray",
    maker: "by Rohit Verma",
    rating: 4.9,
    reviews: 41,
    price: 600,
    category: "Woodworking",
    img: "https://i.pinimg.com/1200x/71/f5/7d/71f57d678e1cd699a792bc8abf7a9e5d.jpg",
    featured: false,
  },
  {
    id: 5,
    name: "Hand Blown Glass Bowl",
    maker: "by Meera Nair",
    rating: 5,
    reviews: 16,
    price: 7800,
    category: "Glassware",
    img: "https://i.pinimg.com/736x/16/9e/88/169e8862c719d8b992b7143cf92dac22.jpg",
    featured: true,
  },
  {
    id: 6,
    name: "Silver Leaf Earrings",
    maker: "by Tanya Mehta",
    rating: 4.6,
    reviews: 19,
    price: 2900,
    category: "Jewelry",
    img: "https://i.pinimg.com/736x/5b/02/64/5b026439cb48a298b7557c0018311173.jpg",
    featured: false,
  },
  {
    id: 7,
    name: "Abstract Acrylic Painting",
    maker: "by Rishi Khanna",
    rating: 4.7,
    reviews: 22,
    price: 1100,
    category: "Paintings",
    img: "https://i.pinimg.com/1200x/16/44/c1/1644c152bcfd5f5cd1e778c2e0f67aa7.jpg",
    featured: true,
  },
  {
    id: 8,
    name: "Miniature Brass Sculpture",
    maker: "by Sneha Iyer",
    rating: 5,
    reviews: 35,
    price: 9005,
    category: "Sculptures",
    img: "https://i.pinimg.com/1200x/c9/5e/13/c95e131342f94fe15a74aa5df380b424.jpg",
    featured: false,
  },
  {
    id: 9,
    name: "Macramé Wall Hanging",
    maker: "by Kavya R.",
    rating: 4.9,
    reviews: 11,
    price: 3900,
    category: "Home Decor",
    img: "https://i.pinimg.com/736x/ff/89/27/ff8927cf5913c58067f7c4e161447dab.jpg",
    featured: true,
  },
  {
    id: 10,
    name: "Clay Tea Set",
    maker: "by Arjun Malhotra",
    rating: 4.8,
    reviews: 28,
    price: 6500,
    category: "Pottery & Ceramics",
    img: "https://i.pinimg.com/1200x/bf/be/c6/bfbec62349bcffe8b01f86d7ec303992.jpg",
    featured: false,
  },
  {
    id: 11,
    name: "Hand-painted Silk Scarf",
    maker: "by Nidhi Sen",
    rating: 4.7,
    reviews: 14,
    price: 5500,
    category: "Textiles",
    img: "https://i.pinimg.com/1200x/92/e8/f7/92e8f71230bf3d7c9331aac6bdaab026.jpg",
    featured: true,
  },
  {
    id: 12,
    name: "Wooden Lamp Base",
    maker: "by Ishaan Roy",
    rating: 4.6,
    reviews: 20,
    price: 7200,
    category: "Woodworking",
    img: "https://i.pinimg.com/1200x/3e/51/17/3e51179664ee4b85072f58500a9a7ab5.jpg",
    featured: false,
  },
  {
    id: 13,
    name: "Colorful Glass Tumbler Set",
    maker: "by Mitali Das",
    rating: 5,
    reviews: 10,
    price: 4800,
    category: "Glassware",
    img: "https://i.pinimg.com/1200x/d9/55/d5/d955d535f25a897c6e9586499e2734c6.jpg",
    featured: true,
  },
  {
    id: 14,
    name: "Ethnic Beaded Necklace",
    maker: "by Devika Singh",
    rating: 4.8,
    reviews: 26,
    price: 3800,
    category: "Jewelry",
    img: "https://i.pinimg.com/736x/1d/97/6b/1d976bbab9a9323cbb39ea5e3da270c0.jpg",
    featured: false,
  },
  {
    id: 15,
    name: "Landscape Canvas Painting",
    maker: "by Manav Joshi",
    rating: 5,
    reviews: 17,
    price: 1020,
    category: "Paintings",
    img: "https://i.pinimg.com/736x/6d/d5/ee/6dd5eed5f2af525059ba1940570d2a3f.jpg",
    featured: true,
  },
  {
    id: 16,
    name: "Terracotta Garden Figurine",
    maker: "by Tanvi Prasad",
    rating: 4.9,
    reviews: 13,
    price: 8800,
    category: "Sculptures",
    img: "https://i.pinimg.com/1200x/90/bc/2e/90bc2e1bb771303c61368dbe3bc8ef2a.jpg",
    featured: false,
  },
  {
    id: 17,
    name: "Macrame Coasters Set",
    maker: "by Reema Kapoor",
    rating: 4.5,
    reviews: 18,
    price: 2200,
    category: "Home Decor",
    img: "https://i.pinimg.com/1200x/c0/cc/98/c0cc9846a0dd2a5a0646380ca0af2224.jpg",
    featured: true,
  },
  {
    id: 18,
    name: "Hand-painted Clay Mugs",
    maker: "by Mohit Jain",
    rating: 4.7,
    reviews: 21,
    price: 4200,
    category: "Pottery & Ceramics",
    img: "https://i.pinimg.com/736x/95/cf/c8/95cfc82c98e2941ea870c97a9bd386a6.jpg",
    featured: false,
  },
  {
    id: 19,
    name: "Silk Table Runner",
    maker: "by Shreya T.",
    rating: 4.6,
    reviews: 9,
    price: 333,
    category: "Textiles",
    img: "https://i.pinimg.com/1200x/11/a8/9d/11a89d18168a1fe5fba832b5d48e77ae.jpg",
    featured: true,
  },
  {
    id: 20,
    name: "Wooden Spice Rack",
    maker: "by Karan Desai",
    rating: 4.8,
    reviews: 16,
    price: 580,
    category: "Woodworking",
    img: "https://i.pinimg.com/736x/64/8e/99/648e9907106feb5e511a83b506b42cdf.jpg",
    featured: false,
  },
];

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
        <img src={product.img} alt={product.name} className="product-image" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x200/cccccc/333333?text=Product'; }} />
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
          <Star color="#fbbf24" fill="#fbbf24" size={16} /> {product.rating} ({product.reviews})
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

const TrendingProducts = ({ products, addToCart, addToWishlist, removeFromWishlist, isWishlisted }) => {
  return (
    <section>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              isWishlisted={isWishlisted}
            />
          ))
        ) : (
          <p className="no-products-found">No products found matching your criteria.</p>
        )}
      </div>
    </section>
  );
};

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 1) paginate(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) paginate(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`page-btn ${currentPage === number ? "active" : ""}`}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      ))}
      <button
        className="page-btn"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

function FilterSidebar({
  selectedCategories,
  setSelectedCategories,
  selectedRating,
  setSelectedRating,
  priceRange,
  setPriceRange,
  onClose,
}) {
  const categories = [
    'Pottery & Ceramics', 'Jewelry', 'Textiles', 'Woodworking',
    'Glassware', 'Paintings', 'Sculptures', 'Home Decor'
  ];
  const ratings = [5, 4, 3];

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    } else {
      setSelectedCategories(prev => [...prev, category]);
    }
  };

  return (
    <div className="filter-box">
      <div className="filter-header">
        <h3 className="filter-title">Filters</h3>
        <button onClick={onClose} className="close-filter-btn">
          <X size={20} />
        </button>
      </div>
      <div className="filter-section">
        <label className="sec-title">Price Range</label>
        <input
          type="range"
          min="0"
          max="10000"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        />
        <div className="price-range-labels">
          <span>₹0</span>
          <span>₹{priceRange}</span>
        </div>
      </div>
      <div className="filter-section">
        <label className="sec-title">Categories</label>
        {categories.map((category) => (
          <label key={category} className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>
      <div className="filter-section">
        <label className="sec-title">Rating</label>
        {ratings.map((r) => (
          <label key={r} className="radio-label">
            <input
              type="radio"
              name="rating"
              value={r}
              checked={selectedRating === r}
              onChange={() => setSelectedRating(r)}
            />
            {"⭐".repeat(r)} & up
          </label>
        ))}
        <label className="radio-label">
          <input
            type="radio"
            name="rating"
            value=""
            checked={selectedRating === null}
            onChange={() => setSelectedRating(null)}
          />
          None
        </label>
      </div>
    </div>
  );
}

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const productsPerPage = 8;

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [priceRange, setPriceRange] = useState(10000);
  const [categoryFilter, setCategoryFilter] = useState("All"); // Renamed to avoid conflict with Category component
  const [sortOrder, setSortOrder] = useState("Featured"); // New state for sorting
  const [searchTerm, setSearchTerm] = useState(""); // New state for search bar

  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    // Apply category line filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(p => p.category.includes(categoryFilter));
    }

    // Apply sidebar filters
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    if (selectedRating !== null) {
      filtered = filtered.filter(p => p.rating >= selectedRating);
    }
    filtered = filtered.filter(p => p.price <= priceRange);

    // Apply search term filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          p.maker.toLowerCase().includes(lowerCaseSearchTerm) ||
          p.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Apply sorting
    switch (sortOrder) {
      case "Featured":
        filtered.sort((a, b) => (b.featured ? 1 : -1) - (a.featured ? 1 : -1));
        break;
      case "Newest":
        filtered.sort((a, b) => b.id - a.id); // Assuming higher ID means newer
        break;
      case "Price : Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price : High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Top Rated":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredAndSortedProducts = getFilteredAndSortedProducts();

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, selectedCategories, selectedRating, priceRange, sortOrder, searchTerm]);

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  return (
    <div className='Shop'>
      <div className="header">
        <h2>Shop Handmade Art</h2>
        <p>Discover unique, authentic pieces from talented artisans worldwide</p>
      </div>

      <div className="search-line">
        <div className="search">
          <Search />
          <input
            type="search"
            placeholder='Search products, artisans...'
            id="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filter-toggle-btn" onClick={() => setIsFilterVisible(true)}>
          <Filter size={16} />
          <span>Filters</span>
        </button>
        <Dropdown onSortChange={setSortOrder} currentSort={sortOrder} />
      </div>

      <div className="Category-line">
        <div className={`Category-button ${categoryFilter === "All" ? "active" : ""}`} onClick={() => setCategoryFilter("All")}>
          <button className='Category-btn'>All</button>
        </div>
        <div className={`Category-button ${categoryFilter === "Pottery & Ceramics" ? "active" : ""}`} onClick={() => setCategoryFilter("Pottery & Ceramics")}>
          <button className='Category-btn'>Pottery</button>
        </div>
        <div className={`Category-button ${categoryFilter === "Jewelry" ? "active" : ""}`} onClick={() => setCategoryFilter("Jewelry")}>
          <button className='Category-btn'>Jewelry</button>
        </div>
        <div className={`Category-button ${categoryFilter === "Textiles" ? "active" : ""}`} onClick={() => setCategoryFilter("Textiles")}>
          <button className='Category-btn'>Textile</button>
        </div>
        <div className={`Category-button ${categoryFilter === "Woodworking" ? "active" : ""}`} onClick={() => setCategoryFilter("Woodworking")}>
          <button className='Category-btn'>Woodworking</button>
        </div>
        <div className={`Category-button ${categoryFilter === "Glassware" ? "active" : ""}`} onClick={() => setCategoryFilter("Glassware")}>
          <button className='Category-btn'>Glasswares</button>
        </div>
        <div className={`Category-button ${categoryFilter === "Paintings" ? "active" : ""}`} onClick={() => setCategoryFilter("Paintings")}>
          <button className='Category-btn'>Paintings</button>
        </div>
        <div className={`Category-button ${categoryFilter === "Sculptures" ? "active" : ""}`} onClick={() => setCategoryFilter("Sculptures")}>
          <button className='Category-btn'>Sculptures</button>
        </div>
      </div>

      <div className="shop-main-content">
        <div className={`filter-container ${isFilterVisible ? 'visible' : ''}`} onClick={() => setIsFilterVisible(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <FilterSidebar
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              onClose={() => setIsFilterVisible(false)}
            />
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <TrendingProducts
            products={currentProducts}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
            isWishlisted={isWishlisted}
          />
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={filteredAndSortedProducts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Shop;
