import express, { Router } from 'express';
import { approveproduct, pendingproducts, rejectProduct , adminlogin } from '../controller/admincontroller.js';


import { verifyAdmin }  from '../middleware/userauth.js';


const adminroutes =express.Router();
adminroutes.post('/adminlogin' , adminlogin);   
adminroutes.get('/pendingproducts' ,verifyAdmin, pendingproducts);
adminroutes.put('/approveproducts',verifyAdmin , approveproduct);
adminroutes.delete('/rejectproduct' ,verifyAdmin, rejectProduct);

export default adminroutes;
 
