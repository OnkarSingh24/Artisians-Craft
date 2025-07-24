import mongoose, { Schema } from "mongoose";
const productinfo = new mongoose.Schema({
name: {type: String , required: true },
price: {type: Number , required: true },
category: {type: String, required: true },
image: {type: String  },
description: {type: String , required: true },
sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
});
const productmodel = mongoose.models.product || mongoose.model('product', productinfo);
 export  default productmodel ;