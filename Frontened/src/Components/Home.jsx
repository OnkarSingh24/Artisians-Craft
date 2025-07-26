import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FaGem, FaPaintBrush } from "react-icons/fa";
import { GiAmphora, GiWoodPile, GiYarn, GiGlassBall, GiRupee } from "react-icons/gi";
import {
  MapPin, Star, Heart, Gem,
  Scissors,
  Hammer,
  FlaskConical,
  Brush,
  CheckCheck,
  Medal,
  Sparkles,
  ShoppingBag,
  ShoppingCart,
  DollarSign,
  StarIcon,
  QuoteIcon,
  IndianRupee,
} from 'lucide-react';

const ImageCarousel = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={3000}
      transitionTime={600}
      emulateTouch
      stopOnHover
    >
      <div className="carousel-slide">
        <img
          src="https://media.istockphoto.com/id/458417619/photo/craftsman-working-on-the-loom.jpg?s=612x612&w=0&k=20&c=2v9JfzZZ--jYkuPj4Hp3iZSUItVSiwUUscsKgWgNixU="
        />
        <span className="badge verified">
          <CheckCheck size={14} /> Verified Artisan
        </span>
      </div>
      <div className="carousel-slide">
        <img
          src="https://i.pinimg.com/1200x/ab/30/df/ab30dfb9831541c335d65c5f787f0335.jpg"
          alt="Art 2"
        />
        <span className="badge award">
          <Medal size={14} /> Award Winning
        </span>
      </div>
      <div className="carousel-slide">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D12AQFsK_G3iOWSLg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1702122874916?e=1758758400&v=beta&t=p-1YNiYlAfp9VngxdTOLrB3LD6gzE9DtPkB_RZ6L8J8"
          alt="Art 3"
        />
        <span className="badge verified">
          <CheckCheck size={14} /> Verified Artisan
        </span>
      </div>
    </Carousel>
  );
};
const artisans = [
  {
    name: 'Puneet Kumar ',
    specialty: 'Ceramic Pottery',
    location: 'Jaipur, Rajasthan',
    rating: '4.9',
    products: '2 products',
    followers: '2.3k followers',
    img: 'https://media.licdn.com/dms/image/v2/D4D12AQFsK_G3iOWSLg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1702122874916?e=1758758400&v=beta&t=p-1YNiYlAfp9VngxdTOLrB3LD6gzE9DtPkB_RZ6L8J8',
  },
  {
    name: 'Dolly Sharma',
    specialty: 'Hand-woven Textiles',
    location: 'Jalandhar, Punjab',
    rating: '4.8',
    products: '3 products',
    followers: '1.8k followers',
    img: 'https://www.thegoodloop.com/wp-content/uploads/2022/01/akhil-pawar-XCd_6nOdzjo-unsplash-1536x999.jpeg',
  },
  {
    name: 'Joginder Sharma',
    specialty: 'Jewelry Design',
    location: 'Mumbai, Maharashtra',
    rating: '5',
    products: '4 products',
    followers: '3.1k followers',
    img: 'https://images.picxy.com/cache/2020/6/11/5721937a5889c9c5d13c49f1f9241287.jpg',
  },
];

const ArtisanCard = ({ artisan }) => {
  const [liked, setLiked] = useState(false);
  return(
  <div className="artisan-card">
    <div className="card-img-wrapper">
      <img className='artisan-image' src={artisan.img} alt={artisan.name} />
      <button
                className={`likebtn ${liked ? 'liked' : ''}`}
                onClick={() => setLiked(!liked)}
              >
                <Heart size={18} fill={liked ? 'red' : 'none'} color={liked ? 'red' : '#333'} />
              </button>
    </div>
    <div className="card-details">
      <h3>{artisan.name}</h3>
      <p className="specialty">{artisan.specialty}</p>
      <p className="location"><MapPin size={14} /> {artisan.location}</p>
      <div className="stats">
        <span className="rating"><Star color="#fbbf24" fill="#fbbf24" size={16} /> {artisan.rating}</span>
        <span className='pro-fol'>{artisan.products}</span>
        <span className='pro-fol' >{artisan.followers}</span>
      </div>
    </div>
  </div>
);
};
const products = [
  {
    name: 'Vintage Handwoven Basket',
    maker: 'by Meera Gupta',
    rating: '4.8(17)',
    price: '5900',
    img: 'https://i.pinimg.com/1200x/b1/9e/02/b19e02603918e2110f55821c4904a0b7.jpg',
  },
  {
    name: 'Terracotta Clay Water Jug',
    maker: 'by Ravi Kumar',
    rating: '4.6(12)',
    price: '3900',
    img: 'https://i.pinimg.com/1200x/1b/f2/24/1bf22437ec3d536e2a02686ae49400b8.jpg',
  },
  {
    name: 'Handcrafted Wooden Elephant',
    maker: 'by Anjali Verma',
    rating: '5(34)',
    price: '75',
    img: 'https://i.pinimg.com/736x/3b/33/e8/3b33e8894ed9870a2756029197a11dd7.jpg',
  },
  {
    name: 'Kashmiri Papier-Mâché Box',
    maker: 'by Faizan Dar',
    rating: '4.9(21)',
    price: '45',
    img: 'https://i.pinimg.com/736x/41/41/f2/4141f26717e47d7cfe60f680b2a4e9b4.jpg',
  },
];

const customers = [
  {
    desc: '"The quality of craftsmanship here is unmatched. Every piece tells a story and you can feel the love that went into making it."',
    name: 'Sarah Mitchell',
    location: 'New York,NY',
    rating: '5',
    photo: '',
  },
  {
    desc: '"The quality of craftsmanship here is unmatched. Every piece tells a story and you can feel the love that went into making it."',
    name: 'Sarah Mitchell',
    location: 'New York,NY',
    rating: '5',
    photo: '',
  },
  {
    desc: '"The quality of craftsmanship here is unmatched. Every piece tells a story and you can feel the love that went into making it."',
    name: 'Sarah Mitchell',
    location: 'New York,NY',
    rating: '5',
    photo: '',
  },
];
const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  return(
  <div className="product-card">
    <div className="card-img-wrapper2">
      <img className='product-image' src={product.img} alt={product.name} />
      <button
                className={`likebtn ${liked ? 'liked' : ''}`}
                onClick={() => setLiked(!liked)}
              >
                <Heart size={18} fill={liked ? 'red' : 'none'} color={liked ? 'red' : '#333'} />
              </button>
    </div>
    <div className="card-detail">
      <h4>{product.name}</h4>
      <p className="maker">{product.maker}</p>
      <span className="rating"><Star color="#fbbf24" fill="#fbbf24" size={16} /> {product.rating}</span>
      <div className="last-line">
        <span className="price"><IndianRupee size={18} /> {product.price}</span>
        <button className='cart'>< ShoppingCart size={18} />Add</button>
      </div>
    </div>
  </div>
);
};

const Customers = ({ customer }) => (
  <div className="customer-card">
    <div className="upper">
      <div className="inverted-commas">< QuoteIcon size={30} /></div>
      <div className="rating">{customer.rating}<StarIcon size={18} className='star' /> </div>
      <p>{customer.desc}</p>
    </div>
    <div className="customer-info">
      <div className="photo">{customer.photo}</div>
      <div className="name-location"><div className="customer-name">{customer.name}</div>
        <div className="location"> {customer.location}</div>

      </div>
    </div>
  </div>
);

const CustomerReviews = () => {
  return (
    <section className="Customer-Reviews">
      <h2>What Our Customers Say</h2>
      <p className="subheading">Real stories from real people who found their perfect handmade treasures</p>
      <div className="review">
        {customers.map((customer, index) => (
          <Customers key={index} customer={customer} />
        ))}
      </div>
    </section>
  );
};

const TrendingProducts = () => {
  return (
    <section className="Trending-Products">
      <h2>Trending Products</h2>
      <p className="subheading">Discover the most loved pieces from our community of artisans</p>
      <div className="product-list">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <Link to='/shop' className="view-all-btn2">Show All Products →</Link>
    </section>
  );
};
const FeaturedArtisans = () => {
  return (
    <section className="featured-artisans">
      <h2>Featured Artisans</h2>
      <p className="subheading">Meet the talented creators behind our most beloved pieces</p>
      <div className="artisan-list">
        {artisans.map((artisan, index) => (
          <ArtisanCard key={index} artisan={artisan} />
        ))}
      </div>
      <Link to='/artisandirectory' className="view-all-btn">View All Artisans →</Link>
    </section>
  );
};



const Categories = ({ category }) => {
  return (
    <div className="all_types">
      <div className="Icon">{category.Icon}</div>
      <div className="Desc">{category.Desc}</div>
      <div className="InStock">{category.InStock}</div>
    </div>
  );
};

const Home = () => {
  const categories = [
    {
      Icon: <GiAmphora color="#b5651d" size={32} />,
      Desc: "Pottery ",
      InStock: "2 items",
    },
    {
      Icon: <FaGem color="#00bcd4" size={32} />,
      Desc: "Jewelry",
      InStock: "5 items",
    },
    {
      Icon: <GiYarn color="#d6336c" size={32} />,
      Desc: "Textiles",
      InStock: "1 items",
    },
    {
      Icon: <GiWoodPile color="#795548" size={32} />,
      Desc: "Woodworking",
      InStock: "4 items",
    },
    {
      Icon: <GiGlassBall color="#03a9f4" size={32} />,
      Desc: "Glassware",
      InStock: "8 items",
    },
    {
      Icon: <FaPaintBrush color="#f44336" size={32} />,
      Desc: "Paintings",
      InStock: "2 items",
    },
  ];


  return (
    <div>
      {/* STARTING HOME PAGE */}
      <div className="background-pattern">
        <div className="contents">
          <div className="left-side">
            <div className="top">
              <p>
                <Sparkles className="icon" /> Discover Authentic Handmade Art
              </p>
            </div>
            <h1 style={{
              fontFamily: 'Kaushan Script',
              fontSize: '55px',
              fontWeight: 'bold',
              lineHeight: '1',
              color: '#391a36c4',
            }}>
              "Where <span style={{
                color: 'hsl(15deg 74.78% 48%)',
                textShadow: '0 0 1x hsl(15deg 74.78% 48%), 0 0 1x hsl(15deg 74.78% 48%)',
              }}>Creativity</span> Breathes & <span style={{
                color: 'hsl(15deg 74.78% 48%)',
                textShadow: '0 0 1x hsl(15deg 74.78% 48%), 0 0 1x hsl(15deg 74.78% 48%)',
              }}>Authenticity</span> Belongs."
            </h1>


            <p1>
              Discover unique, handcrafted treasures from talented artisans around the world.
              Each piece tells a story, crafted with passion and tradition.
            </p1>
            <div className="btn">
              <div className="div">
                <Link to='/shop' className="btn1">
                  <ShoppingBag className="Bagicon" />
                  Shop Now
                </Link>
              </div>
              <div className="SellerBtn">
                <Link to='/registerasseller'><button>Become a Seller</button></Link>
              </div>
            </div>

            <div className="stats">
              <div className="stat-item">
                <h3>25+</h3>
                <p>Artisans</p>
              </div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Products</p>
              </div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>

          <div className="right-side">
            <div className="carousel-wrapper">
              <ImageCarousel />
            </div>
          </div>
        </div>
      </div>

      {/* EXPLORE CATEGORIES */}
      <div className="ExploreCategories">
        <h2>Explore Categories</h2>
        <p>Browse our curated collection of handmade goods across various artistic disciplines</p>
        <div className="container">
          {categories.map((item) => (
            <Categories key={item.id} category={item} />
          ))}
        </div>
      </div>
      <FeaturedArtisans />
      <TrendingProducts />
      <CustomerReviews />
      <footer className="footer">
        <div className="footer-top">
          <h2>Ready to Start Your Journey?</h2>
          <p>
            Whether you're looking for unique handmade pieces or want to share
            your own creations, join our community of art lovers and talented artisans.
          </p>
          <div className="footer-buttons">
            <Link to='/shop' className="btn_primary">
              Start Shopping <span role="img" aria-label="cart">🛒</span>
            </Link>
            <Link to='/artisans' className="btn_secondary">
              Join as Artisan <span role="img" aria-label="user">👤</span>
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-brand">
            <div className="logo">CA</div>
            <h3>CraftiArts</h3>
            <p>
              Connecting artisans with art lovers worldwide through authentic,
              handcrafted treasures.
            </p>
            <button className="community-btn">🌱 Growing Community</button>
          </div>

          <div className="footer-links">
            <div className="column">
              <h4>Shop</h4>
              <ul>
                <li>All Products</li>
                <li>Pottery</li>
                <li>Jewelry</li>
                <li>Textiles</li>
              </ul>
            </div>

            <div className="column">
              <h4>Support</h4>
              <ul>
                <li>Help Center</li>
                <li>Shipping Info</li>
                <li>Returns</li>
                <li>Contact Us</li>
              </ul>
            </div>

            <div className="column">
              <h4>Company</h4>
              <ul>
                <li>About Us</li>
                <li>Our Artisans</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-legal">
          <p>© 2024 CraftiArts. All rights reserved.</p>
          <div>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;