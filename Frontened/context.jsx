//import { meta } from "@eslint/js";
import axios from "axios";
import { createContext, useState } from "react";

export const content = createContext()
export const ContextProvider = (props)=>{
   const backendurl = import.meta.env.VITE_BACKEND_URL
   const[isloggedin , setisloggedin ] = useState(false)
   const[userdata , setuserdata ] = useState(null)
   const[isregister , setisregister ] = useState(false)
   const[isregisterasseller , setisregisterasseller ] = useState(false)
   const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [rejectedUsers, setRejectedUsers] = useState([]);
const [sellerData, setSellerData] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/status/fetchuser`);
      const users = res.data;

      setPendingUsers(users.filter(u => u.status === "pending"));
      setApprovedUsers(users.filter(u => u.status === "approved"));
      setRejectedUsers(users.filter(u => u.status === "rejected"));
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };
  const fetchSellerData =async()=>{
    try {
      const {data} =await axios.get(`${backendurl}/api/authroutes/registerasseller` , {withCredentials:true});
    setSellerData(data.user);
    } catch (error) {
      console.log("failed to load user");
      
    }
  };


    const value ={
        backendurl,
        isloggedin ,setisloggedin,
        isregister, setisregister,
        userdata,setuserdata ,
        isregisterasseller , setisregisterasseller ,
        sellerData,setSellerData ,
        
        pendingUsers,
        approvedUsers,
        rejectedUsers,
        fetchUsers,
        fetchSellerData

    }


    return (
        <content.Provider value={value}>
            {props.children}

        </content.Provider>

    )
}