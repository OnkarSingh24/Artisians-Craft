import React, { useEffect, useState } from "react";
import "./ArtisanDashboard.css";
import { Pencil, Plus } from "lucide-react";

export default function ArtisanDashboard() {
  const [artisan, setArtisan] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/artisan/1"); // Replace with actual artisan ID logic
        const data = await res.json();
        setArtisan(data);
      } catch (err) {
        console.error("Failed to fetch artisan:", err);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchArtisan();
    fetchProducts();
  }, []);

  return (
    <div className="artisan-dashboard">
      {/* Left Panel */}
      <aside className="dashboard-sidebar">
        <img
          src={
            artisan?.photo ||
            "https://media.istockphoto.com/id/1425297665/photo/potter-professional-happy-man-working-with-brown-clay-in-workshop-businessman-artist-trade.jpg?s=612x612&w=0&k=20&c=uELA2JRfM-uoHpsiEQdfhs21iy_NqmdR6LqilnIL8po="
          }
          alt="Artisan"
          className="artisan-photo"
        />
        <div className="artisan-info">
          {artisan ? (
            <>
              <h2>{artisan.name}</h2>
              <div className="artisan-contact">
                <p>
                  <b>Email:</b> {artisan.email}
                </p>
                <p>
                  <b>Business Name:</b> {artisan.businessName}
                </p>
                <p>
                  <b>Phone:</b> {artisan.phone}
                </p>
                <p>
                  <b>GST:</b> {artisan.gst}
                </p>
                <button className="action-btn">
                  <Pencil size={18} />
                  Edit Profile
                </button>
              </div>
            </>
          ) : (
            <p>Loading artisan info...</p>
          )}
        </div>
      </aside>

      {/* Right Panel */}
      <main className="dashboard-main">
        <div className="details-section">
          <div className="details-header">
            <div>
              <h3>About the Artisan</h3>
              <p className="artisan-desc">
                {artisan
                  ? artisan.description ||
                    "No description provided. Update your profile to add more about yourself."
                  : "Loading..."}
              </p>
              <p className="craft-category">
                <strong>Primary Craft Category:</strong>{" "}
                {artisan ? artisan.category || "N/A" : "Loading..."}
              </p>
            </div>
          </div>
        </div>

        <div className="products-section">
          <div className="section-header">
            <h1>Products</h1>
            <button className="action-btn sticky-add">
              <Plus size={18} />
              Add Product
            </button>
          </div>
          <div className="product-list">
            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              products.map((product) => (
                <div className="product-card" key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h5>{product.name}</h5>
                    <p className="product-category">{product.category}</p>
                    <p className="product-price">{product.price}</p>
                    <button className="edit-product-btn">
                      <Pencil size={14} />
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
