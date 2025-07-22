import mongoose from "mongoose";

const cartiteminfo  = new mongoose.Schema({
    productid :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'product',
        required: true
    },

    quantity:{
        type:Number,
        default:1
    }
});

const cartinfo = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
        unique: true
    },
    items : [cartiteminfo]
});

const cartmodel = mongoose.model('cart' , cartinfo);
export default cartmodel;