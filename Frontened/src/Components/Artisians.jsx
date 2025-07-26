import React, { useState } from 'react';
import './artisians.css';
import { Link } from 'react-router-dom';
import {
  Users,
  Globe,
  Award,
  TrendingUp,
  Star,
  MapPin,
  Search,
  Filter,
  
  LineChart,
  Users as UsersIcon
} from 'lucide-react';

const artisans = [
  {
    name: 'Jaspreet Sharma',
    craft: 'Ceramic Pottery',
    location: 'Jalandhar, Punjab',
    years: 15,
    rating: 4.9,
    products: 127,
    followers: 2300,
    awards: 7,
    verified: false,
    img: "https://i.pinimg.com/736x/6b/b6/d0/6bb6d094147301f3ccce198b6d6179bc.jpg",
    featured: true
  },
  {
    name: 'Raju Shrivastav',
    craft: 'Textile',
    location: 'Jaipur, Rajasthan',
    years: 3,
    rating: 3.5,
    products: 79,
    followers: 230,
    awards: 2,
    verified: true,
    img: 'https://i.pinimg.com/736x/a6/90/6f/a6906fde96ec3328c4078150233279da.jpg',
    featured: true
  },
  {
    name: 'Arjun Mehra',
    craft: 'Pottery',
    location: 'Varanasi, Uttar Pradesh',
    years: 12,
    rating: 4.8,
    products: 89,
    followers: 1800,
    awards: 5,
    verified: true,
    img: 'https://i.pinimg.com/736x/be/c0/a1/bec0a1697ccfdcd745e33368645756a8.jpg',
    featured: true
  },
  {
    name: 'Priya Chauhan',
    craft: 'Silver Jewelry Design',
    location: 'Udaipur, Rajasthan',
    years: 18,
    rating: 5.0,
    products: 156,
    followers: 3100,
    awards: 4,
    verified: false,
    img: 'https://i.pinimg.com/736x/4b/f6/63/4bf6633b4e8a98201805dddb78de559b.jpg',
    featured: false
  },
  {
    name: 'Meera Krishnan',
    craft: 'Terracotta Sculpting',
    location: 'Kanchipuram, Tamil Nadu',
    years: 15,
    rating: 4.9,
    products: 127,
    followers: 2300,
    awards: 7,
    verified: true,
    img: 'https://i.pinimg.com/1200x/d8/cd/7a/d8cd7afee0b6fb4fd492f6686f59da33.jpg',
    featured: false
  },
  {
    name: 'Sameer Ali',
    craft: 'Chikankari Embroidery',
    location: 'Lucknow, Uttar Pradesh',
    years: 20,
    rating: 4.7,
    products: 95,
    followers: 1500,
    awards: 6,
    verified: true,
    img: 'https://i.pinimg.com/736x/6a/5a/ad/6a5aadd9194686d1a1553c7f336ef0fd.jpg',
    featured: false
  },
  {
    name: 'Kavita Das',
    craft: 'Kantha Stitching',
    location: 'Kolkata, West Bengal',
    years: 22,
    rating: 4.9,
    products: 110,
    followers: 2100,
    awards: 7, // Corrected from 'toards'
    verified: true,
    img: 'https://i.pinimg.com/736x/ae/dd/53/aedd537c80e54e3f2dbc482ed43cc5f1.jpg',
    featured: true
  },
  {
    name: 'Rohan Desai',
    craft: 'Block Printing',
    location: 'Ahmedabad, Gujarat',
    years: 10,
    rating: 4.8,
    products: 150,
    followers: 2800,
    awards: 9,
    verified: true,
    img: 'https://i.pinimg.com/736x/bf/9b/6c/bf9b6ca3f1ff282886d1eb5de535b32d.jpg',
    featured: true
  },
];

const Artisians = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filters = ["All", "Featured", "Verified", "Newest", "Top Rated", "Most Products"];
  const getFilteredArtisans = () => {
    let filtered = [...artisans];
    switch (activeTab) {
      case "Featured":
        filtered = filtered.filter((a) => a.featured);
        break;
      case "Verified":
        filtered = filtered.filter((a) => a.verified);
        break;
      case "Newest":
        filtered = filtered.sort((a, b) => a.years - b.years);
        break;
      case "Top Rated":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "Most Products":
        filtered = filtered.sort((a, b) => b.products - a.products);
        break;
      case "All":
      default:
        break;
    }
    return showAll ? filtered : filtered.slice(0, 4);
  };
  const visibleArtisans = getFilteredArtisans();

  const handleViewProfile = (artisan) => {
    console.log(`View profile for: ${artisan.name}`);
  };

  return (
    <div className='artisians'>
      <div className="intro-section">
        <div className='top-button'>
          ✨ <span>Meet Our Artisans</span>
        </div>
        <h1 className='headline'>
          Discover <span className="highlight">Talented</span> Artisans from <br /> Around the World
        </h1>
        <p className='subtext'>
          Connect with skilled craftspeople who pour their passion into every piece. Each artisan brings
          unique techniques, cultural heritage, and years of dedication to their craft.
        </p>
        <button className='cta-btn'>
          Become an Artisan →
        </button>
      </div>

      <div className='stats-section'>
        <div className='stat-box'>
          <div className="icon-box"><Users color="#ea572a" size={24} /></div>
          <h2>1,200+</h2>
          <p>Active Artisans</p>
        </div>
        <div className='stat-box'>
          <div className='icon-box'><Globe color="#ea572a" size={24} /></div>
          <h2>45+</h2>
          <p>Countries</p>
        </div>
        <div className='stat-box'>
          <div className='icon-box'><Award color="#ea572a" size={24} /></div>
          <h2>50+</h2>
          <p>Craft Categories</p>
        </div>
        <div className='stat-box'>
          <div className='icon-box'><TrendingUp color="#ea572a" size={24} /></div>
          <h2>25,000+</h2>
          <p>Products Created</p>
        </div>
      </div>

      <div className='search-filter'>
        <div className='search-top'>
          <Search size={18} />
          <input type="text" placeholder='Search artisans by name, location, or specialty...' />
        </div>
        <select className='dropdown'>
          <option>All Categories</option>
          <option>Jewelry</option>
          <option>Textile</option>
          <option>Decor</option>
          <option>Pottery & Ceramics</option>
          <option>Handlooms</option>
          <option>Woodworking</option>
          <option>Glassware</option>
          <option>Paintings</option>
        </select>
        <select className="dropdown">
          <option>All Locations</option>
          <option>Punjab</option>
          <option>Rajasthan</option>
          <option>Kerala</option>
          <option>Gujarat</option>
          <option>Kashmir</option>
          <option>Bihar</option>
          <option>Assam</option>
        </select>
      </div>

      <div className="filter-tabs">
        {filters.map((item) => (
          <button
            key={item}
            className={activeTab === item ? "filter-tab active" : "filter-tab"}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <hr className="divider" />

      <div className='featured-container'>
        <div className='header'>
          <div>
            <h4>Featured Artisans</h4>
            <p>Discover exceptional craftspeople who represent the best of their traditions</p>
          </div>
        </div>

        <div className='cards'>
          {visibleArtisans.map((a, i) => (
            <div className='artisan-card' key={i}>
              <div className='image-placeholder'>
              <img className='ar-image' src={a.img} alt={a.name} />
                {a.verified && <span className="badge green">✔ Verified</span>}
                {a.featured && <span className="badge purple">★ Featured</span>}
              </div>
              <div className='artisan-info'>
                <h5>{a.name}</h5>
                <p className='craft'>{a.craft}</p>
                <p className='location'><MapPin size={14} /> {a.location}</p>
                
                <div className='stats'>
                  <span><Star size={14} color="#E26132" /> {a.rating} ({a.products} products)</span>
                  <span>{a.followers.toLocaleString()} followers</span>
                </div>
                <div className="tags">
                  <span>{a.years} yrs active</span>
                  <span><Award size={12} /> {a.awards} awards</span>
                </div>
                <button className="view-profile-btn" onClick={() => handleViewProfile(a)}>View Profile</button>
              </div>
            </div>
          ))}
        </div>
        <div className="artisan-buttons-container">
          {!showAll && (
            <button className="view-more-btn" onClick={() => setShowAll(true)}>View More Artisans</button>
          )}
          {/* CORRECTED: This links to your ArtisanDirectory page */}
          <Link to="/artisandirectory">
            <button className="view-more-btn">All Artisans</button>
          </Link>
        </div>
      </div>

      <div className="why-choose-craftedart-section">
        <h2>Why Artisans Choose CraftedArt</h2>
        <p className="why-choose-subtitle">
          Join a community that values your craft and helps you reach customers worldwide
        </p>
        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-icon-wrapper green-icon">
              <Globe size={32} />
            </div>
            <h3>Global Reach</h3>
            <p>Showcase your work to customers in over 45 countries</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon-wrapper blue-icon">
              <LineChart size={32} />
            </div>
            <h3>Grow Your Business</h3>
            <p>Access tools and resources to scale your craft business</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon-wrapper purple-icon">
              <UsersIcon size={32} />
            </div>
            <h3>Supportive Community</h3>
            <p>Connect with fellow artisans and share knowledge</p>
          </div>
        </div>
        <button className="cta-btn start-journey-btn">
          Start Your Journey →
        </button>
      </div>
    </div>
  );
};

export default Artisians;