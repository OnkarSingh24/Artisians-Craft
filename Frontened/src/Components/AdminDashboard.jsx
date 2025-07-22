import React, { useContext, useEffect, useState } from "react";
import "./AdminDashboard.css";
import axios from "axios";
import { content } from '../../context';

const AdminDashboard = () => {
  const {
    backendurl,
    pendingUsers,
    approvedUsers,
    rejectedUsers,
    fetchUsers,
  } = useContext(content);

  const [pendingProducts, setPendingProducts] = useState([]);

  // Fetch both users and products when component mounts
  useEffect(() => {
    fetchUsers();
    fetchPendingProducts();
  }, []);

  // Fetch Pending Products
  const fetchPendingProducts = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/admin/pendingproducts`);
      setPendingProducts(res.data.products);
    } catch (err) {
      console.error("Failed to fetch pending products", err);
    }
  };

  // Seller Actions
  const handleApprove = async (id) => {
    try {
      await axios.put(`${backendurl}/api/status/${id}/approve`);
      fetchUsers();
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`${backendurl}/api/status/${id}/reject`);
      fetchUsers();
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  // Product Actions
  const handleApproveProduct = async (id) => {
    try {
      await axios.put(`${backendurl}/api/admin/approveproduct/${id}`);
      fetchPendingProducts();
    } catch (err) {
      console.error("Approve product failed", err);
    }
  };

  const handleRejectProduct = async (id) => {
    try {
      await axios.delete(`${backendurl}/api/admin/rejectproduct/${id}`);
      fetchPendingProducts();
    } catch (err) {
      console.error("Reject product failed", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h2>Welcome, <span>Admin</span></h2>
        <p>Manage seller and product approvals efficiently</p>
        <div className="dashboard-summary">
          <span>Pending Sellers: {pendingUsers.length}</span>
          <span>Approved Sellers: {approvedUsers.length}</span>
          <span>Rejected Sellers: {rejectedUsers.length}</span>
          <span>Pending Products: {pendingProducts.length}</span>
        </div>
      </header>

      {/* Pending Sellers Section */}
      <section className="section-pending">
        <h3>Pending Seller Requests <span>({pendingUsers.length})</span></h3>
        <p>Review and process new seller registrations</p>
        <div className="card-list">
          {pendingUsers.map(user => (
            <div key={user._id} className="card">
              <div className="user-info">
                <strong>{user.name}</strong>
                <p>{user.email}</p>
                <small>Registered on {new Date(user.createdAt).toLocaleString()}</small>
              </div>
              <div className="actions">
                <button className="approve" onClick={() => handleApprove(user._id)}>✓ Approve</button>
                <button className="reject" onClick={() => handleReject(user._id)}>✕ Reject</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seller History Section */}
      <section className="section-history">
        <h3>Seller Approval History</h3>
        <p>Track your recent seller approvals and rejections</p>
        <div className="card-list">
          {[...approvedUsers, ...rejectedUsers].map(user => (
            <div key={user._id} className="card">
              <div className="user-info">
                <strong>{user.name}</strong>
                <p>{user.email}</p>
                <small>Processed on {new Date(user.updatedAt).toLocaleString()}</small>
              </div>
              <div className={`status ${user.status}`}>
                {user.status === "approved" ? "✔️ Approved" : "❌ Rejected"}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Approval Section */}
      <section className="section-products">
        <h3>Pending Product Approvals <span>({pendingProducts.length})</span></h3>
        <p>Review and approve or reject product listings</p>
        <div className="card-list">
          {pendingProducts.map(product => (
            <div key={product._id} className="card">
              <div className="product-info">
                <strong>{product.name}</strong>
                <p>{product.description}</p>
                <small>Uploaded on {new Date(product.createdAt).toLocaleString()}</small>
              </div>
              <div className="actions">
                <button className="approve" onClick={() => handleApproveProduct(product._id)}>✓ Approve</button>
                <button className="reject" onClick={() => handleRejectProduct(product._id)}>✕ Reject</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
