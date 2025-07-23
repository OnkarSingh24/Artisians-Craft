import React, { useEffect, useState, useCallback ,useContext } from "react";
import { content } from '../../context';
import "./ArtisanDashboard.css";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Trash2,
  AlertCircle,
  Pencil,
} from "lucide-react";
import axios from "axios";


const mockArtisan = {
  id: "1",
  name: "Elena Petrova",
  email: "elena.p@example.com",
  businessName: "Elena's Pottery Haven",
  phone: "987-654-3210",
  gst: "22ABCDE1234F1Z5",
  category: "Pottery",
  photo: "https://media.istockphoto.com/id/1425297665/photo/potter-professional-happy-man-working-with-brown-clay-in-workshop-businessman-artist-trade.jpg?s=612x612&w=0&k=20&c=uELA2JRfM-uoHpsiEQdfhs21iy_NqmdR6LqilnIL8po=",
  description: "Creating handcrafted pottery inspired by nature's forms and textures. Each piece is unique and made with passion, bringing a touch of organic beauty to your home."
};

const mockProducts = [
  { id: 101, name: "Ceramic Coffee Mug", category: "Tableware", price: "25.00", image: "https://placehold.co/600x400/d6ccc2/333?text=Mug" },
  { id: 102, name: "Large Terracotta Planter", category: "Garden", price: "75.50", image: "https://placehold.co/600x400/e3d5ca/333?text=Planter" },
  { id: 103, name: "Hand-painted Serving Bowl", category: "Tableware", price: "45.00", image: "https://placehold.co/600x400/d5bdaf/333?text=Bowl" },
  { id: 104, name: "Decorative Clay Vase", category: "Home Decor", price: "60.00", image: "https://placehold.co/600x400/edede9/333?text=Vase" },
];

// --- Helper Components ---

const ProductForm = ({ initialData, onSubmit, formType }) => {
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!formData.name || !formData.price || !formData.category) {
      setError("Please fill in at least Name, Price, and Category.");
      return;
    }
    onSubmit(formData);
  };

  const isEditMode = formType === 'edit';

  return (
    <div className="form-container">
      <h2>{isEditMode ? "Edit Product" : "Add New Product"}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="name">Product Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required min="0" />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
          </div>
          <div className="form-group full-width">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4"></textarea>
          </div>
        </div>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="submit-btn">
          {isEditMode ? <Pencil size={18} /> : <PlusCircle size={18} />}
          {isEditMode ? "Save Changes" : "Add Product"}
        </button>
      </form>
    </div>
  );
};


// --- Main Dashboard Component ---

export default function ArtisanDashboard() {
  const [activeView, setActiveView] = useState("dashboard");
  const { backendurl ,sellerData } = useContext(content);
  const [artisan, setArtisan] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // State for the product being edited
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const emptyFormState = { Name: "", category: "", price: "", imageUrl: "", description: "", quantity: 1 };

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendurl}/api/crud/mine`, {
        withCredentials: true,
      });
      setProducts(data.products);
      setArtisan(sellerData); 
      setLoading(false);
    } catch (err) {
      setError("Failed to load products.");
      setLoading(false);
    }
  };

  fetchProducts();
}, [backendurl, sellerData]);


  const handleProductAdd = async(formData) => {
    try {
    const {data} =await axios.post(`${backendurl}/api/crud`, formData , {withCredentials:true});
    setProducts((prev) => [data.product, ...prev]);
    alert("Product added successfully!");
    setActiveView("products");  
    } catch (error) {
      alert("failed to add product");
      
    }
    
  };
  
  const handleProductUpdate = async(updatedData) => {
    try {
     const {data} = await axios.put(`${backendurl}/api/crud/${updatedData.id}` , updatedData , {withCredentials:true});
    alert("Product updated successfully!");
    setEditingProduct(null); 
    setActiveView("products"); 
    } catch (error) {
     alert("failed to update product") ;
    }
    
  };

  const handleProductDelete = async(productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
     const {data} =await axios.delete(`${backendurl}/api/crud/${productId}`, {withCredentials:true});
    alert("Product deleted successfully.");
    } catch (error) {
     alert("failed to delete product"); 
    }
  };
  
  const handleEditClick = (product) => {
      setEditingProduct(product);
      setActiveView('editProduct');
  };

  const renderContent = () => {
    if (loading) return <div className="loading-state">Loading Dashboard...</div>;
    if (error) return <div className="error-state"><AlertCircle size={48} /><p>{error}</p></div>;

    switch (activeView) {
      case "products":
        return (
          <div className="products-view">
            <h2>My Products ({products.length})</h2>
            <div className="product-list">
              {products.length > 0 ? (
                products.map((product) => (
                  <div className="product-card" key={product.id}>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-details">
                      <h3>{product.name}</h3>
                      <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
                      <p className="product-category">{product.category}</p>
                    </div>
                    <div className="product-actions">
                        <button onClick={() => handleEditClick(product)} className="action-btn edit-btn" aria-label="Edit product">
                            <Pencil size={16} />
                        </button>
                        <button onClick={() => handleProductDelete(product.id)} className="action-btn delete-btn" aria-label="Delete product">
                            <Trash2 size={16} />
                        </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-state-message">You haven't added any products yet.</p>
              )}
            </div>
          </div>
        );
      case "addProduct":
        return <ProductForm initialData={emptyFormState} onSubmit={handleProductAdd} formType="add" />;
      case "editProduct":
        return <ProductForm initialData={editingProduct} onSubmit={handleProductUpdate} formType="edit" />;
      case "dashboard":
      default:
        return (
          <div className="artisan-profile">
            <h2>Artisan Profile</h2>
            <div className="profile-card">
              <img src={artisan?.photo} alt={artisan?.Name} className="profile-photo" />
              <div className="profile-info">
                <h3>{artisan?.Name}</h3>
                <p><strong>Business:</strong> {artisan?.Buissness}</p>
                <p><strong>Email:</strong> {artisan?.Email}</p>
                <p><strong>Phone:</strong> {artisan?.Phone}</p>
                <p><strong>GST No:</strong> {artisan?.Gstin}</p>
                <p><strong>Category:</strong> {artisan?.category}</p>
              </div>
            </div>
            <div className="profile-description">
              <h4>About Me</h4>
              <p>{artisan?.description}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="artisan-dashboard-container">
      <aside className="artisan-sidebar">
        <div className="sidebar-header"><h3>Artisan Panel</h3></div>
        <nav className="sidebar-nav">
          <ul>
            <li><button onClick={() => setActiveView("dashboard")} className={activeView === "dashboard" ? "active" : ""}><LayoutDashboard size={20} /><span>Dashboard</span></button></li>
            <li><button onClick={() => setActiveView("products")} className={activeView === "products" ? "active" : ""}><Package size={20} /><span>Products</span></button></li>
            <li><button onClick={() => setActiveView("addProduct")} className={activeView === "addProduct" ? "active" : ""}><PlusCircle size={20} /><span>Add Product</span></button></li>
          </ul>
        </nav>
      </aside>
      <main className="artisan-main-content">{renderContent()}</main>
    </div>
  );
}
