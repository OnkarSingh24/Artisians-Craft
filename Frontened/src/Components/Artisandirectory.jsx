import React, { useState, useEffect } from 'react';
import './ArtisanDirectory.css';

const ArtisanDirectory = () => {
  const artisans = [
    {
      id: 'art001',
      name: 'Jaspreet Sharma',
      craft: 'Ceramic Pottery',
      location: 'Jalandhar, Punjab',
      years: 15,
      rating: 4.9,
      products: 127,
      followers: 2300,
      awards: 7,
      verified: false,
      bio: 'From his studio in Jalandhar, Jaspreet Sharma channels 15 years of mastery into creating stunning ceramic pottery. His work is celebrated for its rustic charm and functional elegance, blending traditional Punjabi forms with a contemporary aesthetic.',
      image: 'https://i.pinimg.com/736x/6b/b6/d0/6bb6d094147301f3ccce198b6d6179bc.jpg'
    },
    {
      id: 'art002',
      name: 'Raju Shrivastav',
      craft: 'Textile',
      location: 'Jaipur, Rajasthan',
      years: 3,
      rating: 3.5,
      products: 79,
      followers: 230,
      awards: 2,
      verified: true,
      bio: 'Raju Shrivastav brings the vibrant spirit of Jaipur to life through his exquisite textile work. Though early in his professional journey, his pieces showcase a remarkable flair for color and pattern, making traditional Rajasthani textiles accessible and fresh.',
      image: 'https://i.pinimg.com/736x/a6/90/6f/a6906fde96ec3328c4078150233279da.jpg'
    },
    {
      id: 'art003',
      name: 'Arjun Mehra',
      craft: 'Pottery',
      location: 'Varanasi, Uttar Pradesh',
      years: 12,
      rating: 4.8,
      products: 89,
      followers: 1800,
      awards: 5,
      verified: true,
      bio: 'Nestled in the ancient city of Varanasi, Arjun Mehra is a seasoned potter whose hands have shaped clay for over a decade. His creations are known for their earthy textures and minimalist forms, reflecting the serene and spiritual atmosphere of the ghats.',
      image: 'https://i.pinimg.com/736x/be/c0/a1/bec0a1697ccfdcd745e33368645756a8.jpg'
    },
    {
      id: 'art004',
      name: 'Priya Chauhan',
      craft: 'Silver Jewelry Design',
      location: 'Udaipur, Rajasthan',
      years: 18,
      rating: 5.0,
      products: 156,
      followers: 3100,
      awards: 4,
      verified: false,
      bio: 'Priya Chauhan is a celebrated artisan from Udaipur, the city of lakes, where she designs breathtaking silver jewelry. With 18 years of experience, her work is a testament to Rajasthani heritage, featuring intricate details and high-quality gemstones that capture royal elegance.',
      image: 'https://i.pinimg.com/736x/4b/f6/63/4bf6633b4e8a98201805dddb78de559b.jpg'
    },
    {
      id: 'art005',
      name: 'Meera Krishnan',
      craft: 'Terracotta Sculpting',
      location: 'Kanchipuram, Tamil Nadu',
      years: 15,
      rating: 4.9,
      products: 127,
      followers: 2300,
      awards: 7,
      verified: true,
      bio: 'In Kanchipuram, a town renowned for its temples, Meera Krishnan creates divine terracotta sculptures. Her work is deeply rooted in South Indian culture, depicting gods, goddesses, and village life with profound detail and expressive artistry.',
      image: 'https://i.pinimg.com/1200x/d8/cd/7a/d8cd7afee0b6fb4fd492f6686f59da33.jpg'
    },
    {
      id: 'art006',
      name: 'Sameer Ali',
      craft: 'Chikankari Embroidery',
      location: 'Lucknow, Uttar Pradesh',
      years: 20,
      rating: 4.7,
      products: 95,
      followers: 1500,
      awards: 6,
      verified: true,
      bio: 'Sameer Ali is a master of Chikankari, the delicate and intricate embroidery native to Lucknow. With two decades of experience, he leads a team of artisans to create ethereal garments that are both timeless and sought after for their exquisite craftsmanship.',
      image: 'https://i.pinimg.com/736x/6a/5a/ad/6a5aadd9194686d1a1553c7f336ef0fd.jpg'
    },
    {
      id: 'art007',
      name: 'Kavita Das',
      craft: 'Kantha Stitching',
      location: 'Kolkata, West Bengal',
      years: 22,
      rating: 4.9,
      products: 110,
      followers: 2100,
      awards: 7,
      verified: true,
      bio: 'From the heart of West Bengal, Kavita Das tells stories through her needle and thread with Kantha stitching. Each piece is a canvas of vibrant colors and narrative patterns, reflecting the rich folklore and traditions of her region with every stitch.',
      image: 'https://i.pinimg.com/736x/ae/dd/53/aedd537c80e54e3f2dbc482ed43cc5f1.jpg'
    },
    {
      id: 'art008',
      name: 'Rohan Desai',
      craft: 'Block Printing',
      location: 'Ahmedabad, Gujarat',
      years: 10,
      rating: 4.8,
      products: 150,
      followers: 2800,
      awards: 9,
      verified: true,
      bio: 'Rohan Desai is a prominent figure in the world of block printing in Ahmedabad. His designs marry traditional Gujarati motifs with modern color palettes, producing textiles that are celebrated for their quality, artistry, and the sustainable practices he champions.',
      image: 'https://i.pinimg.com/736x/bf/9b/6c/bf9b6ca3f1ff282886d1eb5de535b32d.jpg'
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