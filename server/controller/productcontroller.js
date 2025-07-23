import productmodel from "../module/productmodules.js";
 //create new product
 
export const createproduct =async(req , res)=>{
   
    try {
        
    const product = new productmodel({ ...req.body, approved: false })
    await product.save();
    

    return res.json({success: true , message:'product added successfully !'})
    } 
    catch (error) {
    return res.json({success:false , message:error.message}) 
 
    }
  
};
    //read all products of an artisans 
export const getproduct =async(req,res)=>{
    try {
   const { category } = req.params; 
    const products = await  productmodel.find({category}) 
    
    return res.json({success:true,products})
    } catch (error) {
      return res.json({success:false , message:error.message})    
    }
};
//update the products 
export const updateproduct =async(req,res)=>{
    try {
  const product = await productmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  return res.json({ success: true, product });
        
    } catch (error) {
   return res.json({success:false , message:error.message})         
       
    }
  
};
//delete a product
export const deleteproduct =async(req,res)=>{
    try {
  const product = await productmodel.findByIdAndDelete(req.params.id);
  return res.json({ success: true, message:'product deleted succesfully!' });
        
    } catch (error) {
   return res.json({success:false , message:error.message})         
       
    }
  
};
//get all products
export const getmyproducts = async (req, res) => {
  try {
    const products = await productmodel.find({ sellerId: req.user._id });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: "Error fetching your products" });
  }
};