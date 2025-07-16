import React,{useState}from 'react';
import './Shop.css';
import { Search ,List ,Grid3x3} from 'lucide-react';
import { RiDropdownList } from 'react-icons/ri';



const Dropdown =()=>{

    const [SelectedCategory, setSelectedCategory] = useState("");
    return(
        <select  value = {SelectedCategory}
        onChange={(e)=>setSelectedCategory(e.target.value)}>
            <option value="Featured">Featured</option>
            <option value="Newest">Newest</option>
            <option value="Price : Low to High">Price : Low to High</option>
            <option value="Price : High to Low">Price : High to Low</option>
            <option value="Top Rated">Top Rated</option>
        </select>
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
        ))}
      </div>
    </div>
  );
}



const Shop = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
const [selectedRating, setSelectedRating] = useState(null);
const [priceRange, setPriceRange] = useState(500);
  const [viewType, setViewType] = useState("grid");
  const [Category, setCategory] = useState("All");
  return (
    <div className='Shop'>
      <div className="header">
        <h2>Shop Handmade Art</h2>
        <p>Discover unique, authentic pieces from talented artisans worldwide</p>
      </div>
      <div className="search-line">
        <div className="search"><Search/><input type="search" placeholder='search products , artisans and categories...' id="search=bar" /></div>
        <Dropdown/>
        <div className="grid-line">
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
       </div>
      </div>
      <div className="Category-line">
          <div
            className={`Category-button ${Category === "All" ? "active" : ""}`}
            onClick={() => setCategory("All")}
          >
            <button className='Category-btn'>All</button>
          </div>
          <div
            className={`Category-button ${Category === "Pottery" ? "active" : ""}`}
            onClick={() => setCategory("Pottery")}
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
            className={`Category-button ${Category === "Glasswares" ? "active" : ""}`}
            onClick={() => setCategory("Glasswares")}
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

  <div className="product-list">{/* your product cards */}</div>
</div>

    </div>
  )
}

export default Shop
