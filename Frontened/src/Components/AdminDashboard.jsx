import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const [adminInfo, setAdminInfo] = useState({});
  const [productStatus, setProductStatus] = useState({
    pending: [],
    approved: [],
    rejected: []
  });

  useEffect(() => {
    fetchAdminInfo();
    fetchProductStatus();
  }, []);

  const fetchAdminInfo = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/admin/admininfo`, {
        withCredentials: true
      });
      setAdminInfo(res.data.admin);
    } catch (err) {
      console.error("Error fetching admin info", err);
    }
  };

  const fetchProductStatus = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/admin/productstatus`, {
        withCredentials: true
      });
      setProductStatus(res.data);
    } catch (err) {
      console.error("Error fetching product status", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Welcome, {adminInfo?.Name}</h2>
      <p>Email: {adminInfo?.Email}</p>
      <p>Role: {adminInfo?.role}</p>

      <h3>Pending Products: {productStatus.pending.length}</h3>
      <h3>Approved Products: {productStatus.approved.length}</h3>
      <h3>Rejected Products: {productStatus.rejected.length}</h3>

      {/* Optional: list a few pending products */}
      <ul>
        {productStatus.pending.slice(0, 3).map((p) => (
          <li key={p._id}>{p.Name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
