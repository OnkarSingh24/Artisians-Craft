import product from '../module/productmodules.js'
import jwt from 'jsonwebtoken';

const adminemail = "sharmakshita42@gmail.com";
const adminpassword ="akshita";

//adminlogin
export const adminlogin = (req, res) => {
  const { email, password } = req.body;
  if (email === adminemail && password === adminpassword) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ success: true, token });
  }
  return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
};

//get pending  product
 export const pendingproducts =async(req , res)=>{
  try {
  const products =await product.find({status : 'pending'});
  return res.json({sucess: true , products});  
  } catch (error) {
    return res.json({success:false , message: error.message});
    
  }

 };

 //aprove product 

 export const approveproduct =async(req,res)=>{
try {
    const updatedproduct =await product.findByIdAndUpdate( req.params.id , {status:'approved'} ,{new:true});
if (!updatedproduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, product: updatedproduct });
    
} catch (error) {
    return res.status(500).json({ success: false, message: error.message });
    
}

};

//to delete the product when not approved
export const rejectProduct = async (req, res) => {
  try {
    const deleted = await product.findByIdAndDelete(req.params.id , {status: 'rejected'} , {new:true});
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, message: "Product rejected and deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};