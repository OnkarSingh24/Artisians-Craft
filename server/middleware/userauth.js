import jwt from "jsonwebtoken";
import user from '../module/usermodule.js';


const userauth =async(req ,res ,next)=>{
    //const{token} =req.cookies;
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];


    if(!token){
        return res.json({success :false , message:'Not Authorised, login again'})
    }
    try {
       const decodedtoken = jwt.verify(token,process.env.JWT_SECRET);

       if(decodedtoken.id){
        req.body.userID = decodedtoken.id
         next();
       }
       else{
        return res.json({success:false , message:'Not Authorised, login again'})
       }
        
    }
    
    catch (error) {
        return res.json({success :false , message:error.message})
    }
};



export default userauth;



export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden: Not admin" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Not Authorized, login again" });
  }
};
