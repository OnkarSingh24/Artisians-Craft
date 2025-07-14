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
  Filter
} from 'lucide-react';

const artisans = [
  {
    name: 'Elena Rodriguez',
    craft: 'Ceramic Pottery',
    location: 'Santa Fe, New Mexico, USA',
    years: 15,
    rating: 4.9,
    products: 127,
    followers: 2300,
    awards: 7,
    verified: true,
    featured: true
  },
  {
    name: 'Raju Shrivastav',
    craft: 'Ceramic Pottery',
    location: 'Patna,Bihar',
    years: 3,
    rating: 3.5,
    products: 79,
    followers: 230,
    awards: 2,
    verified: true,
    featured: true
  },
  {
    name: 'Marcus Chen',
    craft: 'Hand-woven Textiles',
    location: 'Portland, Oregon, USA',
    years: 12,
    rating: 4.8,
    products: 89,
    followers: 1800,
    awards: 5,
    verified: true,
    featured: true
  },
  {
    name: 'Priya Sharma',
    craft: 'Silver Jewelry Design',
    location: 'Jaipur, Rajasthan, India',
    years: 18,
    rating: 5.0,
    products: 156,
    followers: 3100,
    awards: 4,
    verified: true,
    featured: true
  }
];

const Artisians = () => {
  const [activeTab, setActiveTab] = useState("All");
  const filters = ["All", "Featured", "Verified", "Newest", "Top Rated", "Most Products"];

  return (
    <div className='artisians'>
      <div className="intro-section">
        <div className='top-button'>
          ✨<span>Meet Our Artisans</span>
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
          <option>Kerela</option>
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
          <button className='filter-btn'><Filter size={18} /> More Filters</button>
        </div>

        <div className='cards'>
          {artisans.map((a, i) => (
            <div className='artisan-card' key={i}>
              <div className='image-placeholder'>
                {a.verified && <span className="badge green">✔ Verified</span>}
                {a.featured && <span className="badge purple">★ Featured</span>}
              </div>
              <div className='artisan-info'>
                <h5>{a.name}</h5>
                <p className='craft'>{a.craft}</p>
                <p className='location'><MapPin size={14} /> {a.location}</p>
                <p className='bio'>{a.name} has practised {a.craft.toLowerCase()} for {a.years} years.</p>
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
      </div>

    </div>
  );
};

export default Artisians;
