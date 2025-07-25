import React, { useState, useEffect } from 'react';
import './Shop.css';
import { Search, List, Grid3x3, Filter, X } from 'lucide-react'; // Import Filter and X
import { Heart, Star, IndianRupee, ShoppingCart } from 'lucide-react';


const Dropdown = () => {
  const [SelectedCategory, setSelectedCategory] = useState("");
  return (
    <select value={SelectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}>
      <option value="Featured">Featured</option>
      <option value="Newest">Newest</option>
      <option value="Price : Low to High">Price : Low to High</option>
      <option value="Price : High to Low">Price : High to Low</option>
      <option value="Top Rated">Top Rated</option>
    </select>
  );
};

const products = [
  // Your products array remains unchanged...
  {
    name: "Handcrafted Ceramic Vase",
    maker: "by Priya Sharma",
    rating: "5(23)",
    price: "8090",
    category: "Pottery & Ceramics",
    img: "https://i.pinimg.com/736x/0e/53/ce/0e53ceddd5f463bf767ea4e93af91d87.jpg",
  },
  {
    name: "Boho Clay Wall Hanging",
    maker: "by Aarav Gupta",
    rating: "4.5(12)",
    price: "4050",
    category: "Home Decor",
    img: "https://i.etsystatic.com/9031043/r/il/d02877/6921340460/il_600x600.6921340460_a6wl.jpg",
  },
  {
    name: "Handwoven Cotton Scarf",
    maker: "by Ananya Patel",
    rating: "4.8(30)",
    price: "3500",
    category: "Textiles",
    img: "https://i.pinimg.com/1200x/3e/7e/da/3e7eda8873753f63411c68e8baabc5d2.jpg",
  },
  {
    name: "Wooden Serving Tray",
    maker: "by Rohit Verma",
    rating: "4.9(41)",
    price: "600",
    category: "Woodworking",
    img: "https://i.pinimg.com/1200x/71/f5/7d/71f57d678e1cd699a792bc8abf7a9e5d.jpg",
  },
  {
    name: "Hand Blown Glass Bowl",
    maker: "by Meera Nair",
    rating: "5(16)",
    price: "7800",
    category: "Glassware",
    img: "https://i.pinimg.com/736x/16/9e/88/169e8862c719d8b992b7143cf92dac22.jpg",
  },
  {
    name: "Silver Leaf Earrings",
    maker: "by Tanya Mehta",
    rating: "4.6(19)",
    price: "2900",
    category: "Jewelry",
    img: "https://i.pinimg.com/736x/5b/02/64/5b026439cb48a298b7557c0018311173.jpg",
  },
  {
    name: "Abstract Acrylic Painting",
    maker: "by Rishi Khanna",
    rating: "4.7(22)",
    price: "1100",
    category: "Paintings",
    img: "https://i.pinimg.com/1200x/16/44/c1/1644c152bcfd5f5cd1e778c2e0f67aa7.jpg",
  },
  {
    name: "Miniature Brass Sculpture",
    maker: "by Sneha Iyer",
    rating: "5(35)",
    price: "9005",
    category: "Sculptures",
    img: "https://i.pinimg.com/1200x/c9/5e/13/c95e131342f94fe15a74aa5df380b424.jpg",
  },
  {
    name: "Macramé Wall Hanging",
    maker: "by Kavya R.",
    rating: "4.9(11)",
    price: "3900",
    category: "Home Decor",
    img: "https://i.pinimg.com/736x/ff/89/27/ff8927cf5913c58067f7c4e161447dab.jpg",
  },
  {
    name: "Clay Tea Set",
    maker: "by Arjun Malhotra",
    rating: "4.8(28)",
    price: "6500",
    category: "Pottery & Ceramics",
    img: "https://i.pinimg.com/1200x/bf/be/c6/bfbec62349bcffe8b01f86d7ec303992.jpg",
  },
  {
    name: "Hand-painted Silk Scarf",
    maker: "by Nidhi Sen",
    rating: "4.7(14)",
    price: "5500",
    category: "Textiles",
    img: "https://i.pinimg.com/1200x/92/e8/f7/92e8f71230bf3d7c9331aac6bdaab026.jpg",
  },
  {
    name: "Wooden Lamp Base",
    maker: "by Ishaan Roy",
    rating: "4.6(20)",
    price: "7200",
    category: "Woodworking",
    img: "https://i.pinimg.com/1200x/3e/51/17/3e51179664ee4b85072f58500a9a7ab5.jpg",
  },
  {
    name: "Colorful Glass Tumbler Set",
    maker: "by Mitali Das",
    rating: "5(10)",
    price: "4800",
    category: "Glassware",
    img: "https://i.pinimg.com/1200x/d9/55/d5/d955d535f25a897c6e9586499e2734c6.jpg",
  },
  {
    name: "Ethnic Beaded Necklace",
    maker: "by Devika Singh",
    rating: "4.8(26)",
    price: "3800",
    category: "Jewelry",
    img: "https://i.pinimg.com/736x/1d/97/6b/1d976bbab9a9323cbb39ea5e3da270c0.jpg",
  },
  {
    name: "Landscape Canvas Painting",
    maker: "by Manav Joshi",
    rating: "5(17)",
    price: "1020",
    category: "Paintings",
    img: "https://i.pinimg.com/736x/6d/d5/ee/6dd5eed5f2af525059ba1940570d2a3f.jpg",
  },
  {
    name: "Terracotta Garden Figurine",
    maker: "by Tanvi Prasad",
    rating: "4.9(13)",
    price: "8800",
    category: "Sculptures",
    img: "https://i.pinimg.com/1200x/90/bc/2e/90bc2e1bb771303c61368dbe3bc8ef2a.jpg",
  },
  {
    name: "Macrame Coasters Set",
    maker: "by Reema Kapoor",
    rating: "4.5(18)",
    price: "2200",
    category: "Home Decor",
    img: "https://i.pinimg.com/1200x/c0/cc/98/c0cc9846a0dd2a5a0646380ca0af2224.jpg",
  },
  {
    name: "Hand-painted Clay Mugs",
    maker: "by Mohit Jain",
    rating: "4.7(21)",
    price: "4200",
    category: "Pottery & Ceramics",
    img: "https://i.pinimg.com/736x/95/cf/c8/95cfc82c98e2941ea870c97a9bd386a6.jpg",
  },
  {
    name: "Silk Table Runner",
    maker: "by Shreya T.",
    rating: "4.6(9)",
    price: "333",
    category: "Textiles",
    img: "https://i.pinimg.com/1200x/11/a8/9d/11a89d18168a1fe5fba832b5d48e77ae.jpg",
  },
  {
    name: "Wooden Spice Rack",
    maker: "by Karan Desai",
    rating: "4.8(16)",
    price: "580",
    category: "Woodworking",
    img: "https://i.pinimg.com/736x/64/8e/99/648e9907106feb5e511a83b506b42cdf.jpg",
  },
];

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="product-card">
      <div className="card-img-wrapper2">
        <img src={product.img} alt={product.name} className="product-image" />
        <button
          className={`likebtn ${liked ? 'liked' : ''}`}
          onClick={() => setLiked(!liked)}
        >
          <Heart size={18} fill={liked ? 'red' : 'none'} color={liked ? 'red' : '#333'} />
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

const TrendingProducts = ({ products }) => {
  return (
    <section>
      <div className="product-list">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
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
  onClose, // Prop to close the sidebar on mobile
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
        <label className="section-title">Price Range</label>
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
        <label className="section-title">Categories</label>
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
        <label className="section-title">Rating</label>
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
  
  const productsPerPage = 8;

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [priceRange, setPriceRange] = useState(50000);
  const [Category, setCategory] = useState("All");
  
  // State to manage mobile filter visibility
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchCategoryLine = Category === 'All' || p.category.includes(Category);
    const matchSidebarCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchRating = !selectedRating || parseInt(p.rating[0]) >= selectedRating;
    const matchPrice = parseInt(p.price) <= priceRange;
    return matchCategoryLine && matchSidebarCategory && matchRating && matchPrice;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [Category, selectedCategories, selectedRating, priceRange]);

  return (
    <div className='Shop'>
      <div className="header">
        <h2>Shop Handmade Art</h2>
        <p>Discover unique, authentic pieces from talented artisans worldwide</p>
      </div>

      <div className="search-line">
        <div className="search">
          <Search />
          <input type="search" placeholder='search products, artisans...' id="search-bar" />
        </div>
        <button className="filter-toggle-btn" onClick={() => setIsFilterVisible(true)}>
          <Filter size={16} />
          <span>Filters</span>
        </button>
        <Dropdown />
      </div>

      <div className="Category-line">
        <div className={`Category-button ${Category === "All" ? "active" : ""}`} onClick={() => setCategory("All")}>
          <button className='Category-btn'>All</button>
        </div>
        <div className={`Category-button ${Category === "Pottery & Ceramics" ? "active" : ""}`} onClick={() => setCategory("Pottery & Ceramics")}>
          <button className='Category-btn'>Pottery</button>
        </div>
        <div className={`Category-button ${Category === "Jewelry" ? "active" : ""}`} onClick={() => setCategory("Jewelry")}>
          <button className='Category-btn'>Jewelry</button>
        </div>
        <div className={`Category-button ${Category === "Textiles" ? "active" : ""}`} onClick={() => setCategory("Textiles")}>
          <button className='Category-btn'>Textile</button>
        </div>
        <div className={`Category-button ${Category === "Woodworking" ? "active" : ""}`} onClick={() => setCategory("Woodworking")}>
          <button className='Category-btn'>Woodworking</button>
        </div>
        <div className={`Category-button ${Category === "Glassware" ? "active" : ""}`} onClick={() => setCategory("Glassware")}>
          <button className='Category-btn'>Glasswares</button>
        </div>
        <div className={`Category-button ${Category === "Paintings" ? "active" : ""}`} onClick={() => setCategory("Paintings")}>
          <button className='Category-btn'>Paintings</button>
        </div>
        <div className={`Category-button ${Category === "Sculptures" ? "active" : ""}`} onClick={() => setCategory("Sculptures")}>
          <button className='Category-btn'>Sculptures</button>
        </div>
      </div>

      <div className="shop-main-content">
        <div className={`filter-container ${isFilterVisible ? 'visible' : ''}`} onClick={() => setIsFilterVisible(false)}>
            <div onClick={(e) => e.stopPropagation()}> {/* Prevents closing when clicking inside the sidebar */}
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
          <TrendingProducts products={currentProducts} />
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default Shop;
