import express from 'express';
import {createproduct,deleteproduct,getproduct,updateproduct } from '../controller/productcontroller.js';
const productroutes = express.Router();

productroutes.post('/',createproduct);
productroutes.get('/category/:category', getproduct);
productroutes.put('/:id', updateproduct );
productroutes.delete('/:id', deleteproduct );

export default productroutes;


