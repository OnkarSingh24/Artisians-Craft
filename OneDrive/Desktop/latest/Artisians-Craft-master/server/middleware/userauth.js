import jwt from "jsonwebtoken";
import user from '../module/usermodule.js';


const userauth =async(req ,res ,next)=>{
    const{token} =req.cookies;

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