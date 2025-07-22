//import { meta } from "@eslint/js";
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


    const value ={
        backendurl,
        isloggedin ,setisloggedin,
        isregister, setisregister,
        userdata,setuserdata ,
        isregisterasseller , setisregisterasseller ,
        pendingUsers,
        approvedUsers,
        rejectedUsers,
        fetchUsers,

    }


    return (
        <content.Provider value={value}>
            {props.children}

        </content.Provider>

    )
}