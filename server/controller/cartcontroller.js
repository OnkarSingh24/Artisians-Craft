import express from 'express';
import cartmodel from "../module/cartmodule.js";

// Add to Cart
export const addtocart = async (req, res) => {
  const { productid, quantity } = req.body;
  const userid = req.user.id;

  try {
    let cart = await cartmodel.findOne({ userid });

    if (!cart) {
      cart = new cartmodel({
        userid,
        items: [{ productid, quantity }],
      });
    } else {
      const existingItem = cart.items.find(item => item.productid.toString() === productid);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productid, quantity });
      }
    }

    await cart.save();
    res.json({ success: true, message: "Item added to cart successfully!", cart });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Cart
export const getcart = async (req, res) => {
  const userid = req.user.id;

  try {
    const cart = await cartmodel.findOne({ userid }).populate('items.productid');

    if (!cart) {
      return res.json({ success: true, cart: { items: [] } });
    }

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Cart Item
export const updatecart = async (req, res) => {
  const { productid, quantity } = req.body;
  const userid = req.user.id;

  try {
    const cart = await cartmodel.findOne({ userid });

    if (!cart) {
      return res.json({ success: false, message: 'Cart not found!' });
    }

    const item = cart.items.find(i => i.productid.toString() === productid);

    if (!item) {
      return res.json({ success: false, message: 'Item not in cart' });
    }

    item.quantity = quantity;
    await cart.save();

    res.json({ success: true, message: 'Cart updated', cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove Item from Cart
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

// Clear Entire Cart
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
