import express from 'express';
import productmodel from '../module/productmodules.js';

const incartroutes = express.Router();

incartroutes.post('/getproduct', async (req, res) => {
  try {
    const cartItems = req.body.cartItems; 
    
    const ids = cartItems.map(item => item.productId);

    // Fetch product details from DB
    const products = await productmodel.find({ _id: { $in: ids } });

    // Merge quantity with product info
    const merged = products.map(product => {
    const item = cartItems.find(i => i.productId === product._id.toString());
      return {
        _id: product._id,
        Name: product.Name,
        price: product.price,
        //image: product.image,
        quantity: item.quantity,
      };
    });

    res.json({ success: true, products: merged });
  } catch (error) {

    res.status(500).json({ success: false, message: error.message});
  }
});

export default incartroutes;
