import product from '../module/productmodules.js'

//get pending  product
 export const pendingproducts =async(req , res)=>{
const products =await product.find({approved:false});
return res.json({sucess: true , products});
 };

 //aprove product 

 export const approveproduct =async(req,res)=>{
try {
    const updatedproduct =await product.findByIdAndUpdate( req.params.id , {approved:true} ,{new:true});
if (!updatedproduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, product: updated });
    
} catch (error) {
    return res.status(500).json({ success: false, message: error.message });
    
}

};

//to delete the product when not approved
export const rejectProduct = async (req, res) => {
  try {
    const deleted = await product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, message: "Product rejected and deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};