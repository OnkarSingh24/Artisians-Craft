import express from 'express';
import productmodel from '../module/productmodule.js';

const orderroutes = express.Router();

orderroutes.post('/checkout', async (req, res) => {
  try {
    const cartItems = req.body.cartItems; 
    let total = 0;

    for (let item of cartItems) {
      const product = await productmodel.findById(item.productId);
      if (!product) continue;

      total += product.price * item.quantity;
    }

    res.json({ success: true, total });
  } catch (err) {
    console.error("Error in checkout:", err);
    res.status(500).json({ success: false, message: 'Checkout failed' });
  }
});

export default orderroutes;
