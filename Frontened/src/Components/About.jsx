import React from 'react';
import './About.css';
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
    { icon: "👥", value: "1,200+", label: "Active Artisans" },
    { icon: "🌐", value: "45+", label: "Countries" },
    { icon: "📈", value: "25,000+", label: "Products Sold" },
    { icon: "⭐", value: "4.9/5", label: "Customer Rating" },
];

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="hero-container">
                <div className="story-badge">
                    <span role="img" aria-label="sparkle">✨</span>&nbsp;Our Story
                </div>

                <h1 className="hero-title">
                    Bridging <span className="highlight">Cultures</span> Through<br />the Art of the Hand.
                </h1>

                <p className="hero-description">
                    At Artisan Craft, we believe every handmade item tells a story. We created a global marketplace to bridge traditional craftsmanship with modern commerce, empowering artisans and ensuring their ancient skills thrive.
                </p>

                <div className="hero-buttons">
                    <button className="primary-btn">Join Our Community →</button>
                    <button className="secondary-btn">Explore Artisan Works</button>
                </div>

                <div className="stats-container">
                    {stats.map((item, index) => (
                        <div className="stat-box" key={index}>
                            <div className="stat-icon">{item.icon}</div>
                            <div className="stat-value">{item.value}</div>
                            <div className="stat-label">{item.label}</div>
                        </div>
                    ))}
                </div>

                <div className="combined-mission-vision-section">
                    <section className="section-block mission-section">
                        <div className="text-content">
                            <p className="section-label">Our Mission</p>
                            <h2 className="section-title">Preserving Traditional Crafts for Future Generations</h2>
                            <p className="section-description">
                                Our mission is to create a sustainable marketplace where traditional artisans can thrive in
                                the digital age. We believe that every handmade piece tells a story, preserves culture, and
                                connects us to our shared human heritage.
                            </p>
                            <ul className="mission-list">
                                <li>
                                    <span className="checkbox-icon">✔️</span> Support traditional craftsmanship worldwide
                                </li>
                                <li>
                                    <span className="checkbox-icon">✔️</span> Provide fair income opportunities for artisans
                                </li>
                                <li>
                                    <span className="checkbox-icon">✔️</span> Preserve cultural heritage through art
                                </li>
                            </ul>
                        </div>
                        <div className="image-placeholder">
                            <div className="placeholder-icon"></div>
                        </div>
                    </section>

                    <section className="section-block vision-section">
                        <div className="image-placeholder">
                            <div className="placeholder-icon"></div>
                        </div>
                        <div className="text-content">
                            <p className="section-label">Our Vision</p>
                            <h2 className="section-title">A World Where Handmade Matters</h2>
                            <p className="section-description">
                                We envision a future where handmade goods are valued not just for their beauty, but for
                                their sustainability, authenticity, and the human connection they represent. A world where
                                choosing handmade is choosing to support communities, preserve traditions, and
                                celebrate human creativity.
                            </p>
                            <button className="meet-artisans-button">
                                Meet Our Artisans <span className="arrow-icon">→</span>
                            </button>
                        </div>
                    </section>

                    <section>
                        <div className="values-section-container">
                            <div className="values-header">
                                <h2 className="values-title">Our Values</h2>
                                <p className="values-subtitle">The principles that guide everything we do at CraftedArt</p>
                            </div>
                            <div className="values-cards-container">
                                <div className="value-card">
                                    <div className="value-icon">
                                        <span role="img" aria-label="heart-icon">🧡</span>
                                    </div>
                                    <h3 className="card-title">Authentic Craftsmanship</h3>
                                    <p className="card-description">
                                        We celebrate the beauty of handmade items and the stories behind each piece.
                                    </p>
                                </div>

                                <div className="value-card">
                                    <div className="value-icon">
                                        <span role="img" aria-label="community-icon">👥</span>
                                    </div>
                                    <h3 className="card-title">Community First</h3>
                                    <p className="card-description">
                                        Building meaningful connections between artisans and art lovers worldwide.
                                    </p>
                                </div>

                                <div className="value-card">
                                    <div className="value-icon">
                                        <span role="img" aria-label="quality-icon">🛡️</span>
                                    </div>
                                    <h3 className="card-title">Quality Assurance</h3>
                                    <p className="card-description">
                                        Every artisan is verified and every product meets our quality standards.
                                    </p>
                                </div>

                                <div className="value-card">
                                    <div className="value-icon">
                                        <span role="img" aria-label="fair-trade-icon">🤝</span>
                                    </div>
                                    <h3 className="card-title">Fair Trade</h3>
                                    <p className="card-description">
                                        Ensuring artisans receive fair compensation for their beautiful work.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="team-section-container">
                            <div className="team-header">
                                <h2 className="team-title">Meet Our Team</h2>
                                <p className="team-subtitle">The passionate people behind CraftedArt's mission</p>
                            </div>
                            <div className="team-cards-container">
                                <div className="team-member-card">
                                    <div className="team-image-placeholder">
                                        {<img src="/assets/your-image.png" alt="description" />}
                                    </div>
                                    <h3 className="member-name">Akshita Sharma</h3>
                                    <p className="member-title">
                                        <span className="title-highlight">Founder & CEO</span>
                                    </p>
                                    <p className="member-bio">
                                        Former art curator with 0 years of experience in promoting traditional crafts.
                                    </p>
                                </div>

                                <div className="team-member-card">
                                    <div className="team-image-placeholder">
                                        { }
                                    </div>
                                    <h3 className="member-name">Dishant Sarangal</h3>
                                    <p className="member-title">
                                        <span className="title-highlight">Head of Artisan Relations</span>
                                    </p>
                                    <p className="member-bio">
                                        Worked directly with craft communities across 20+ countries.
                                    </p>
                                </div>

                                <div className="team-member-card">
                                    <div className="team-image-placeholder">
                                    </div>
                                    <h3 className="member-name">Onkar Singh</h3>
                                    <p className="member-title">
                                        <span className="title-highlight">Head of Design</span>
                                    </p>
                                    <p className="member-bio">
                                        Award-winning designer passionate about preserving traditional art forms.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="join-story-section">
                            <div className="join-story-content">
                                <h2 className="join-story-title">Join Our Story</h2>
                                <p className="join-story-description">
                                    Whether you're an artisan looking to share your craft or an art lover seeking
                                    authentic pieces, you're part of our story. Together, we're preserving traditions and
                                    building a more connected world.
                                </p>
                                <div className="join-story-buttons">
                                    <button className="join-story-btn secondary-btn-alt">
                                        Become an Artisan <span className="arrow-icon">→</span>
                                    </button>
                                    <button className="join-story-btn primary-btn-alt">
                                        Start Shopping
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;