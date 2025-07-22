import express from 'express';
import cartmodel from "../module/cartmodule";

export const addtocart =async(req, res)=>{
 const {productid , quantity } = req.body;
 const userid =req.user.id;

 try {
   let cart = await cartmodel.findOne({userid});

   if(!cart){
    cart =new cartmodel ({
        userid,
        items:[(productid , quantity)]
    });
   }

   else{
    const existingitem =cart.items.find(item => item.productid.toString()=== productid)
    if(existingitem){
        existingitem.quantity += quantity;
    }
    else {
        cart.items.push({productid , quantity});
    }

   }
   await cart.save();
 res.json({success : true , message:"Item added to cart succesfully!" });

    
 } catch (error) {
res.json ({ success : true , message : error.message});
    
 }

};

//to get cartitems 
export const getcart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await cartmodel.findOne({ userId }).populate('items.productId');
    if (!cart) return res.json({ success: true, cart: { items: [] } });

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//update items in cart 

export const updatecart = async (req,res)=>{
    const {productid , quantity}= req.body;
    const userid = req.user.id;

    try {
        const cart =await cartmodel.findOne({userid});

        if(!cart){
            return res.json({success: false , message: 'cart not found!'});
        } 
        
        constitems =cart.items.find(i => i.productid.toString() === productid);
        if (!items){
            
                return res.json({ success: false, message: 'Item not in cart' });
            
        }
    item.quantity = quantity;
    await cart.save();
    res.json({ success: true, message: 'Cart updated', cart });    

    } catch (error) {
    res.status(500).json({ success: false, message: error.message });       
    }
 
};

//delete items from cart 
export const removecartitem = async (req, res) => {
  const { productid } = req.params;
  const userid = req.user.id;

  try {
    const cart = await cartmodel.findOneAndUpdate(
      { userid },
      { $pull: { items: { productid } } },
      { new: true }
    );
    res.json({ success: true, message: 'Item removed', cart });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//clear cart 
export const clearcart = async (req, res) => {
  const userid = req.user.id;

  try {
    await cartmodel.findOneAndUpdate(
      { userid },
      { $set: { items: [] } }
    );
    res.json({ success: true, message: 'Cart cleared' });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};