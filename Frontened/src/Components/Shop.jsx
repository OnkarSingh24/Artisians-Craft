import React, { useState,useEffect } from 'react';
import './Shop.css';
import { Search, List, Grid3x3 } from 'lucide-react';
import { RiDropdownList } from 'react-icons/ri';
import { Heart, Star, DollarSign, ShoppingCart } from 'lucide-react';
import { useCart } from "../context/CartContext";


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
  {
    name: "Handcrafted Ceramic Vase",
    maker: "by Priya Sharma",
    rating: "5(23)",
    price: "89",
    category: "Pottery & Ceramics",
    img: "",
  },
  {
    name: "Boho Clay Wall Hanging",
    maker: "by Aarav Gupta",
    rating: "4.5(12)",
    price: "45",
    category: "Home Decor",
    img: "https://i.etsystatic.com/9031043/r/il/d02877/6921340460/il_600x600.6921340460_a6wl.jpg",
  },
  {
    name: "Handwoven Cotton Scarf",
    maker: "by Ananya Patel",
    rating: "4.8(30)",
    price: "35",
    category: "Textiles",
    img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/",
  },
  {
    name: "Wooden Serving Tray",
    maker: "by Rohit Verma",
    rating: "4.9(41)",
    price: "60",
    category: "Woodworking",
    img: "https://m.media-amazon.com/images/I/81oEoUwR8OL._AC_SL1500_.jpg",
  },
  {
    name: "Hand Blown Glass Bowl",
    maker: "by Meera Nair",
    rating: "5(16)",
    price: "78",
    category: "Glassware",
    img: "https://m.media-amazon.com/images/I/91fMlDFJQHL._AC_SL1500_.jpg",
  },
  {
    name: "Silver Leaf Earrings",
    maker: "by Tanya Mehta",
    rating: "4.6(19)",
    price: "29",
    category: "Jewelry",
    img: "https://m.media-amazon.com/images/I/61OyToFNdUL._UY695_.jpg",
  },
  {
    name: "Abstract Acrylic Painting",
    maker: "by Rishi Khanna",
    rating: "4.7(22)",
    price: "110",
    category: "Paintings",
    img: "https://m.media-amazon.com/images/I/51Kk1eK1UCL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    name: "Miniature Brass Sculpture",
    maker: "by Sneha Iyer",
    rating: "5(35)",
    price: "95",
    category: "Sculptures",
    img: "https://m.media-amazon.com/images/I/81knLe8ZUSL._AC_SL1500_.jpg",
  },
  {
    name: "Macramé Wall Hanging",
    maker: "by Kavya R.",
    rating: "4.9(11)",
    price: "39",
    category: "Home Decor",
    img: "https://m.media-amazon.com/images/I/71xfLOqDDsL._AC_SL1500_.jpg",
  },
  {
    name: "Clay Tea Set",
    maker: "by Arjun Malhotra",
    rating: "4.8(28)",
    price: "65",
    category: "Pottery & Ceramics",
    img: "https://m.media-amazon.com/images/I/71Y2OjD5JeL._AC_SL1500_.jpg",
  },
  {
    name: "Hand-painted Silk Scarf",
    maker: "by Nidhi Sen",
    rating: "4.7(14)",
    price: "55",
    category: "Textiles",
    img: "https://m.media-amazon.com/images/I/81ta9DWcErL._AC_SL1500_.jpg",
  },
  {
    name: "Wooden Lamp Base",
    maker: "by Ishaan Roy",
    rating: "4.6(20)",
    price: "72",
    category: "Woodworking",
    img: "https://m.media-amazon.com/images/I/61XMIzTbnhL._AC_SL1200_.jpg",
  },
  {
    name: "Colorful Glass Tumbler Set",
    maker: "by Mitali Das",
    rating: "5(10)",
    price: "48",
    category: "Glassware",
    img: "https://m.media-amazon.com/images/I/71iv9Ksf-ML._AC_SL1500_.jpg",
  },
  {
    name: "Ethnic Beaded Necklace",
    maker: "by Devika Singh",
    rating: "4.8(26)",
    price: "38",
    category: "Jewelry",
    img: "https://m.media-amazon.com/images/I/91gZwO6T5fL._AC_UY1100_.jpg",
  },
  {
    name: "Landscape Canvas Painting",
    maker: "by Manav Joshi",
    rating: "5(17)",
    price: "102",
    category: "Paintings",
    img: "https://m.media-amazon.com/images/I/81vAI3M7lCL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    name: "Terracotta Garden Figurine",
    maker: "by Tanvi Prasad",
    rating: "4.9(13)",
    price: "88",
    category: "Sculptures",
    img: "https://m.media-amazon.com/images/I/71dwvMfv1lL._AC_SL1500_.jpg",
  },
  {
    name: "Macrame Coasters Set",
    maker: "by Reema Kapoor",
    rating: "4.5(18)",
    price: "22",
    category: "Home Decor",
    img: "https://m.media-amazon.com/images/I/71N+mDZZfdL._AC_SL1500_.jpg",
  },
  {
    name: "Hand-painted Clay Mugs",
    maker: "by Mohit Jain",
    rating: "4.7(21)",
    price: "42",
    category: "Pottery & Ceramics",
    img: "https://m.media-amazon.com/images/I/81ZG8jABuML._AC_SL1500_.jpg",
  },
  {
    name: "Silk Table Runner",
    maker: "by Shreya T.",
    rating: "4.6(9)",
    price: "33",
    category: "Textiles",
    img: "https://m.media-amazon.com/images/I/81I2HD60a9L._AC_SL1500_.jpg",
  },
  {
    name: "Wooden Spice Rack",
    maker: "by Karan Desai",
    rating: "4.8(16)",
    price: "58",
    category: "Woodworking",
    img: "",
  },
];



const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const { addToCart } = useCart(); // get function from context

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
        <button className="cart-float-btn" onClick={addToCart}>
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
            <DollarSign size={18} /> {product.price}
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




function FilterSidebar({ selectedCategories, setSelectedCategories, selectedRating, setSelectedRating, priceRange, setPriceRange }) {
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
      <h3 className="filter-title">Filters</h3>

      <div className="filter-section">
        <label className="section-title">Price Range</label>
        <input
          type="range"
          min="0"
          max="500"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        />
        <div className="price-range-labels">
          <span>$0</span>
          <span>${priceRange}</span>
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
          
        ))}<label className="radio-label">
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
  const productsPerPage = 6; // or 8 or any number you want per page
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [priceRange, setPriceRange] = useState(500);
  // const [viewType, setViewType] = useState("grid");
  const [Category, setCategory] = useState("All");
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
        <div className="search"><Search /><input type="search" placeholder='search products , artisans and categories...' id="search-bar" /></div>
        <Dropdown />
        {/* <div className="grid-line">
          <div
            className={`icon-button ${viewType === "grid" ? "active" : ""}`}
            onClick={() => setViewType("grid")}
          >
            <Grid3x3 />
          </div>
          <div
            className={`icon-button ${viewType === "list" ? "active" : ""}`}
            onClick={() => setViewType("list")}
          >
            <List />
          </div>
        </div> */}
      </div>
      <div className="Category-line">
        <div
          className={`Category-button ${Category === "All" ? "active" : ""}`}
          onClick={() => setCategory("All")}
        >
          <button className='Category-btn'>All</button>
        </div>
        <div
          className={`Category-button ${Category === "Pottery & Ceramics" ? "active" : ""}`}
          onClick={() => setCategory("Pottery & Ceramics")}

        >
          <button className='Category-btn'>Pottery</button>
        </div>
        <div
          className={`Category-button ${Category === "Jewelry" ? "active" : ""}`}
          onClick={() => setCategory("Jewelry")}
        >
          <button className='Category-btn'>Jewelry</button>
        </div>
        <div
          className={`Category-button ${Category === "Textile" ? "active" : ""}`}
          onClick={() => setCategory("Textile")}
        >
          <button className='Category-btn'>Textile</button>
        </div>
        <div
          className={`Category-button ${Category === "Woodworking" ? "active" : ""}`}
          onClick={() => setCategory("Woodworking")}
        >
          <button className='Category-btn'>Woodworking</button>
        </div>
        <div
          className={`Category-button ${Category === "Glassware" ? "active" : ""}`}
          onClick={() => setCategory("Glassware")}
        >
          <button className='Category-btn'>Glasswares</button>
        </div>
        <div
          className={`Category-button ${Category === "Paintings" ? "active" : ""}`}
          onClick={() => setCategory("Paintings")}
        >
          <button className='Category-btn'>Paintings</button>
        </div>
        <div
          className={`Category-button ${Category === "Sculptures" ? "active" : ""}`}
          onClick={() => setCategory("Sculptures")}
        >
          <button className='Category-btn' >Sculptures</button>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '24px' }}>
        <FilterSidebar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

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

export default Shop
