//import { meta } from "@eslint/js";
import axios from "axios";
import { createContext, useState } from "react";

export const content = createContext();

export const ContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const [isloggedin, setisloggedin] = useState(false);
  const [userdata, setuserdata] = useState(null);
  const [isregister, setisregister] = useState(false);
  const [isregisterasseller, setisregisterasseller] = useState(false);
  const [sellerData, setSellerData] = useState(null);

  const [adminInfo, setAdminInfo] = useState(null);
  const [productStatus, setProductStatus] = useState({
    pending: [],
    approved: [],
    rejected: []
  });

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
      setProductStatus({
        pending: res.data.pending,
        approved: res.data.approved,
        rejected: res.data.rejected
      });
    } catch (err) {
      console.error("Error fetching product status", err);
    }
  };

  const fetchSellerData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/authroutes/registerasseller`, {
        withCredentials: true
      });
      setSellerData(data.user);
      setuserdata(data.user);
    } catch (error) {
      console.log("failed to load user");
    }
  };

  const value = {
    backendurl,
    isloggedin,
    setisloggedin,
    isregister,
    setisregister,
    userdata,
    setuserdata,
    isregisterasseller,
    setisregisterasseller,
    sellerData,
    setSellerData,

    adminInfo,
    productStatus,
    fetchAdminInfo,
    fetchProductStatus,
    fetchSellerData
  };

  return <content.Provider value={value}>{props.children}</content.Provider>;
};
