import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import axios from "axios";

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [historyUsers, setHistoryUsers] = useState([]);

  // Fetch pending users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sellers");
      const users = res.data;

      const pending = users.filter(user => user.status === "pending");
      const history = users.filter(user => user.status !== "pending");

      setPendingUsers(pending);
      setHistoryUsers(history);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/sellers/${id}/approve`);
      fetchUsers();
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/sellers/${id}/reject`);
      fetchUsers();
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h2>Welcome, <span>Admin</span></h2>
        <p>Manage user registrations and approvals with ease</p>
        <div className="dashboard-summary">
          <span>Pending: {pendingUsers.length}</span>
          <span>Approved: {historyUsers.filter(u => u.status === "approved").length}</span>
          <span>Rejected: {historyUsers.filter(u => u.status === "rejected").length}</span>
        </div>
      </header>

      <section className="section-pending">
        <h3>Pending Approval Requests <span>({pendingUsers.length} waiting)</span></h3>
        <p>Review and process new user registrations</p>
        <div className="card-list">
          {pendingUsers.map(user => (
            <div key={user._id} className="card">
              <div className="user-info">
                <strong>{user.name}</strong>
                <p>{user.email}</p>
                <small>Registered {new Date(user.createdAt).toLocaleString()}</small>
              </div>
              <div className="actions">
                <button className="approve" onClick={() => handleApprove(user._id)}>✓ Approve</button>
                <button className="reject" onClick={() => handleReject(user._id)}>✕ Reject</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-history">
        <h3>Recent Approval Decisions</h3>
        <p>Track your recent approval and rejection activities</p>
        <div className="card-list">
          {historyUsers.map(user => (
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
    </div>
  );
};

export default AdminDashboard;
