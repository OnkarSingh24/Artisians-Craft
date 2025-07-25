import React, { useState, useEffect } from 'react';
import './ArtisanDirectory.css';

const ArtisanDirectory = () => {
  const artisans = [
    { id: 'art001',
      name: 'Elena Rodriguez',
      craft: 'Ceramic Pottery',
      location: 'Santa Fe, New Mexico, USA',
      years: 15,
      rating: 4.9,
      products: 127,
      followers: 2300,
      awards: 7,
      verified: true,
      bio: 'Elena specializes in traditional Pueblo pottery techniques, passed down through generations in her family. Her work is known for intricate geometric patterns and the use of natural earth tones, all crafted from hand-gathered clay and organic pigments. She carefully follows ancestral methods, including outdoor firing, to preserve the authenticity and spirit of her heritage.Each piece she creates reflects a deep cultural connection to the land and the stories of her ancestors. Through her pottery, Elena not only continues a sacred tradition',

      image: 'https://placehold.co/400x300/F05323/ffffff?text=Elena+Pottery'
    },
    {
      id: 'art002',
      name: 'Raju Shrivastav',
      craft: 'Hand-woven Textiles',
      location: 'Patna, Bihar, India',
      years: 8,
      rating: 4.5,
      products: 79,
      followers: 1200,
      awards: 2,
      verified: true,
      bio: 'Raju is a master weaver celebrated for his vibrant silk and cotton textiles that blend traditional Indian motifs with contemporary aesthetics. Drawing from centuries-old weaving techniques, he brings each fabric to life with bold colors, intricate patterns, and a modern touch—resulting in pieces that are both timeless and uniquely expressive.',
      image: 'https://placehold.co/400x300/6B7280/ffffff?text=Raju+Textiles'
    },
    {
      id: 'art003',
      name: 'Marcus Chen',
      craft: 'Wood Carving',
      location: 'Portland, Oregon, USA',
      years: 12,
      rating: 4.8,
      products: 89,
      followers: 1800,
      awards: 5,
      verified: true,
      bio: 'Marcus crafts stunning wooden sculptures and functional art using reclaimed local timber, giving new life to forgotten wood. His work highlights the natural beauty of the grain, with each piece thoughtfully shaped to reveal organic textures and forms. Often inspired by wildlife, his creations blend craftsmanship with a deep respect for nature.',
      image: 'https://placehold.co/400x300/10B981/ffffff?text=Marcus+Wood'
    },
    {
      id: 'art004',
      name: 'Priya Sharma',
      craft: 'Silver Jewelry Design',
      location: 'Jaipur, Rajasthan, India',
      years: 18,
      rating: 5.0,
      products: 156,
      followers: 3100,
      awards: 4,
      verified: true,
      bio: 'Priya is renowned for her intricate silver jewelry, often featuring delicate craftsmanship and semi-precious stones. Her designs beautifully blend traditional Rajasthani aesthetics with modern elegance, resulting in timeless pieces that celebrate heritage while appealing to contemporary tastes.',
      image: 'https://placehold.co/400x300/EF4444/ffffff?text=Priya+Jewelry'
    },
    {
      id: 'art005',
      name: 'Sophie Dubois',
      craft: 'Glass Blowing',
      location: 'Murano, Venice, Italy',
      years: 20,
      rating: 4.7,
      products: 95,
      followers: 2500,
      awards: 6,
      verified: true,
      bio: 'Sophie creates breathtaking glass art ranging from delicate vases to large-scale installations, all marked by vibrant colors and fluid, expressive forms. Drawing inspiration from the Venetian glassmaking tradition, her work captures a sense of movement and light, turning molten glass into timeless beauty.',
      image: 'https://placehold.co/400x300/3B82F6/ffffff?text=Sophie+Glass'
    },
    {
      id: 'art006',
      name: 'Kenji Tanaka',
      craft: 'Origami Art',
      location: 'Kyoto, Japan',
      years: 10,
      rating: 4.6,
      products: 210,
      followers: 1500,
      awards: 3,
      verified: false,
      bio: 'Kenji transforms simple paper into intricate and captivating origami sculptures, blending traditional techniques with imaginative flair. His exceptional precision and creativity breathe life into every fold—whether crafting delicate animals or striking abstract forms—turning paper into expressive works of art.',
      image: 'https://placehold.co/400x300/F97316/ffffff?text=Kenji+Origami'
    },
    {
      id: 'art007',
      name: 'Maria Sanchez',
      craft: 'Talavera Pottery',
      location: 'Puebla, Mexico',
      years: 22,
      rating: 4.9,
      products: 180,
      followers: 2800,
      awards: 8,
      verified: true,
      bio: 'Maria continues the rich tradition of Talavera pottery, hand-painting intricate designs on ceramics. Her pieces are Sophie creates breathtaking glass art ranging from delicate vases to large-scale installations, all marked by vibrant colors and fluid, expressive forms. Drawing inspiration from the Venetian glassmaking tradition, her work captures a sense of movement and light, turning molten glass into timeless beauty., durable, and tell stories of Mexican culture.',
      image: 'https://placehold.co/400x300/8B5CF6/ffffff?text=Maria+Talavera'
    },
  ];

  const [selectedArtisan, setSelectedArtisan] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 


  const handleSelectArtisan = (artisan) => {
    setSelectedArtisan(artisan);
  };

  return (
    <div className="artisan-directory-container">
      <h1 className="main-title">
        Discover Our Talented Artisans
      </h1>

      <div className="content-wrapper">
        <div className="artisan-list-section">
          <h2 className="list-title">All Artisans</h2>
          <div className="artisan-cards-container">
            {artisans.map((artisan) => (
              <div
                key={artisan.id}
                className={`artisan-list-card ${selectedArtisan && selectedArtisan.id === artisan.id ? 'selected' : ''}`}
                onClick={() => handleSelectArtisan(artisan)}
              >
                <img
                  src={artisan.image}
                  alt={artisan.name}
                  className="artisan-list-card-image"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/64x64/E5E7EB/4B5563?text=Artisan" }}
                />
                <div>
                  <h3 className="artisan-list-card-name">{artisan.name}</h3>
                  <p className="artisan-list-card-craft">{artisan.craft}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="artisan-detail-section">
          {selectedArtisan ? (
            <div className={`detail-content-wrapper ${selectedArtisan ? 'detail-card-enter-active' : ''}`}>
              <div className="detail-image-wrapper">
                <img
                  src={selectedArtisan.image}
                  alt={selectedArtisan.name}
                  className="detail-image"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/256x256/E5E7EB/4B5563?text=Artisan" }}
                />
              </div>
              <div className="detail-info-text">
                <h2 className="detail-name">{selectedArtisan.name}</h2>
                <p className="detail-craft">{selectedArtisan.craft}</p>
                <p className="detail-location">
                  <svg xmlns="http://www.w3.org/2000/svg" className="location-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 10 000-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {selectedArtisan.location}
                </p>
                <p className="detail-bio">{selectedArtisan.bio}</p>

                <div className="detail-stats-grid">
                  <div className="stat-item">
                    <span className="star-icon">★</span> {selectedArtisan.rating} Rating
                  </div>
                  <div className="stat-item">
                    <span className="package-icon">📦</span> {selectedArtisan.products} Products
                  </div>
                  <div className="stat-item">
                    <span className="users-icon">👥</span> {selectedArtisan.followers.toLocaleString()} Followers
                  </div>
                  <div className="stat-item">
                    <span className="award-icon">🏅</span> {selectedArtisan.awards} Awards
                  </div>
                  <div className="stat-item">
                    <span className="hourglass-icon">⏳</span> {selectedArtisan.years} Years Exp.
                  </div>
                  <div className="stat-item">
                    <span className={`verified-status ${selectedArtisan.verified ? 'true' : 'false'}`}>
                      {selectedArtisan.verified ? '✔ Verified' : '✖ Not Verified'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`no-selection-message ${!selectedArtisan ? 'detail-card-enter-active' : ''}`}>
              <p>Select an artisan from the left to view their details.</p>
              <p>Click on any card to learn more!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtisanDirectory;