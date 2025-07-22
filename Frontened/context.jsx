import { meta } from "@eslint/js";
import { createContext, useState } from "react";

export const content = createContext()
export const ContextProvider = (props)=>{
   const backendurl = import.meta.env.VITE_BACKEND_URL
   const[isloggedin , setisloggedin ] = useState(false)
   const[userdata , setuserdata ] = useState(null)
   const[isregister , setisregister ] = useState(false)
   const[isregisterasseller , setisregisterasseller ] = useState(false)


    const value ={
        backendurl,
        isloggedin ,setisloggedin,
        isregister, setisregister,
        userdata,setuserdata ,
        isregisterasseller , setisregisterasseller

    }


    return (
        <content.Provider value={value}>
            {props.children}

        </content.Provider>

    )
}