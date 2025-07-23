import express from 'express';
import {createproduct,deleteproduct,getmyproducts,getproduct,updateproduct } from '../controller/productcontroller.js';
const productroutes = express.Router();
import userauth from "../middleware/userauth.js";

productroutes.post('/',createproduct);
productroutes.get('/category/:category', getproduct);
productroutes.get('/mine',userauth, getmyproducts);
productroutes.put('/:id', updateproduct );
productroutes.delete('/:id', deleteproduct );

export default productroutes;


