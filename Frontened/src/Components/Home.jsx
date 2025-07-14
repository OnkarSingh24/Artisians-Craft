import React, { useState } from 'react';
import './Home.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FaGem, FaPaintBrush } from "react-icons/fa";
import { GiAmphora, GiWoodPile, GiYarn, GiGlassBall } from "react-icons/gi";
import {
  MapPin, Star, Heart ,Gem,
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
          src="https://media.licdn.com/dms/image/v2/D5603AQEDI8Qf3PcnAw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727284652267?e=1757548800&v=beta&t=i7aAFAjwXOL0R8DPeBKs_gN4aDVDuLbWCeD3c3SuSn8"
          alt="Art 1"
        />
        <span className="badge verified">
          <CheckCheck size={14} /> Verified Artisan
        </span>
      </div>
      <div className="carousel-slide">
        <img
          src="https://blog.artsper.com/wp-content/uploads/2018/11/GettyImages-943748376-644x429.jpg"
          alt="Art 2"
        />
        <span className="badge award">
          <Medal size={14} /> Award Winning
        </span>
      </div>
      <div className="carousel-slide">
        <img
          src="https://media.timeout.com/images/105277436/750/562/image.jpg"
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
    name: 'Elena Rodriguez',
    specialty: 'Ceramic Pottery',
    location: 'Santa Fe, NM',
    rating: '4.9',
    products: '127 products',
    followers: '2.3k followers',
    img: 'https://via.placeholder.com/300x200',
  },
  {
    name: 'Marcus Chen',
    specialty: 'Hand-woven Textiles',
    location: 'Portland, OR',
    rating: '4.8',
    products: '89 products',
    followers: '1.8k followers',
    img: 'https://via.placeholder.com/300x200',
  },
  {
    name: 'Priya Sharma',
    specialty: 'Jewelry Design',
    location: 'Austin, TX',
    rating: '5',
    products: '156 products',
    followers: '3.1k followers',
    img: 'https://via.placeholder.com/300x200',
  },
];

const ArtisanCard = ({ artisan }) => (
  <div className="artisan-card">
    <div className="card-img-wrapper">
      <img className='artisan-image' src={artisan.img} alt={artisan.name} />
      <button className="like-btn"><Heart size={18} /></button>
    </div>
    <div className="card-details">
      <h3>{artisan.name}</h3>
      <p className="specialty">{artisan.specialty}</p>
      <p className="location"><MapPin size={14} /> {artisan.location}</p>
      <div className="stats">
        <span className="rating"><Star color="#fbbf24" fill="#fbbf24" size={16} /> {artisan.rating}</span>
        <span>{artisan.products}</span>
        <span>{artisan.followers}</span>
      </div>
    </div>
  </div>
);
const products = [
  {
    name: 'Handcrafted Ceramic Vase',
    maker: 'by Priya Sharma',
    rating: '5(23)',
    price : '89',
    img: 'https://www.whisperinghomes.com/media/catalog/product/cache/4ca60b19ecf2bea5af936fc7882cfff5/Vases/VA-79-12-S/Cloud-Terracotta-Vase-Main-Lifestyle.jpg',
  },
  {
    name: 'Handcrafted Ceramic Vase',
    maker: 'by Priya Sharma',
    rating: '5(23)',
    price : '89',
    img: 'https://www.whisperinghomes.com/media/catalog/product/cache/4ca60b19ecf2bea5af936fc7882cfff5/Vases/VA-79-12-S/Cloud-Terracotta-Vase-Main-Lifestyle.jpg',
  },
  {
    name: 'Handcrafted Ceramic Vase',
    maker: 'by Priya Sharma',
    rating: '5(23)',
    price : '89',
    img: 'https://www.whisperinghomes.com/media/catalog/product/cache/4ca60b19ecf2bea5af936fc7882cfff5/Vases/VA-79-12-S/Cloud-Terracotta-Vase-Main-Lifestyle.jpg',
  },
  {
    name: 'Handcrafted Ceramic Vase',
    maker: 'by Priya Sharma',
    rating: '5(23)',
    price : '89',
    img: 'https://www.whisperinghomes.com/media/catalog/product/cache/4ca60b19ecf2bea5af936fc7882cfff5/Vases/VA-79-12-S/Cloud-Terracotta-Vase-Main-Lifestyle.jpg',
  },
 
  
];
const customers =[
  {
    desc : '"The quality of craftsmanship here is unmatched. Every piece tells a story and you can feel the love that went into making it."',
    name : 'Sarah Mitchell',
    location : 'New York,NY',
    rating : '5',
    photo : '',
  },
  {
    desc : '"The quality of craftsmanship here is unmatched. Every piece tells a story and you can feel the love that went into making it."',
    name : 'Sarah Mitchell',
    location : 'New York,NY',
    rating : '5',
    photo : '',
  },
  {
    desc : '"The quality of craftsmanship here is unmatched. Every piece tells a story and you can feel the love that went into making it."',
    name : 'Sarah Mitchell',
    location : 'New York,NY',
    rating : '5',
    photo : '',
  },
];
const ProductCard = ({ product }) => (
  <div className="product-card">
    <div className="card-img-wrapper2">
      <img src={product.img} alt={product.name} />
      <button className="likebtn"><Heart size={18} /></button>
    </div>
    <div className="card-detail">
      <h4>{product.name}</h4>
      <p className="maker">{product.maker}</p>
      <span className="rating"><Star color="#fbbf24" fill="#fbbf24" size={16} /> {product.rating}</span>
      <div className="last-line">
      <span className="price"><DollarSign size={18}/> {product.price}</span>
      <button className='cart'>< ShoppingCart size={18} />Add</button>
      </div>
      </div>
  </div>
);

const Customers = ({ customer }) => (
  <div className="customer-card">
    <div className="inverted-commas">< QuoteIcon size={30}/></div>
   <div className="rating"><StarIcon size = {18} /> {customer.rating}</div>
   <p>{customer.desc}</p>
   <div className="customer-info">
    <div className="photo">{customer.photo}</div>
    <div className="customer-name">{customer.name}</div>
    <div className="location"> {customer.location}
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
      <button className="view-all-btn2">Show All Products →</button>
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
      <button className="view-all-btn">View All Artisans →</button>
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
      Desc: "Pottery & Ceramics",
      InStock: "234 items",
    },
    {
      Icon: <FaGem color="#00bcd4" size={32} />,
      Desc: "Jewelry",
      InStock: "567 items",
    },
    {
      Icon: <GiYarn color="#d6336c" size={32} />,
      Desc: "Textiles",
      InStock: "189 items",
    },
    {
      Icon: <GiWoodPile color="#795548" size={32} />,
      Desc: "Woodworking",
      InStock: "145 items",
    },
    {
      Icon: <GiGlassBall color="#03a9f4" size={32} />,
      Desc: "Glassware",
      InStock: "98 items",
    },
    {
      Icon: <FaPaintBrush color="#f44336" size={32} />,
      Desc: "Paintings",
      InStock: "276 items",
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
            <h1 style={{ fontSize: '60px', fontWeight: 'bold', lineHeight: '1.2' }}>
              Where Artisans Meet Art Lovers
            </h1>
            <p1>
              Discover unique, handcrafted treasures from talented artisans around the world.
              Each piece tells a story, crafted with passion and tradition.
            </p1>
            <div className="btn">
              <div className="div">
                <button className="btn1">
                  <ShoppingBag className="Bagicon" />
                  Shop Now
                </button>
              </div>
              <div className="SellerBtn">
                <button>Become a Seller</button>
              </div>
            </div>

            <div className="stats">
              <div className="stat-item">
                <h3>1,200+</h3>
                <p>Artisans</p>
              </div>
              <div className="stat-item">
                <h3>15,000+</h3>
                <p>Products</p>
              </div>
              <div className="stat-item">
                <h3>50k+</h3>
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
      <FeaturedArtisans/>
      <TrendingProducts/>
      <CustomerReviews/>
    </div>
  );
};

export default Home;
