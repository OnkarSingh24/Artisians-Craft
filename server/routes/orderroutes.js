import express from 'express';
import { addtocart, clearcart, getcart, removecartitem,  updatecart } from "../controller/cartcontroller.js";
import userauth, {} from "../middleware//userauth.js";


const cartrouter =express.Router();

cartrouter.post('/add', userauth , addtocart);
cartrouter.get('/getcart', userauth , getcart);
cartrouter.put('/update', userauth , updatecart);
cartrouter.delete('/deleteitem/:id', userauth , removecartitem);
cartrouter.delete('/clear', userauth , clearcart);

export default cartrouter;