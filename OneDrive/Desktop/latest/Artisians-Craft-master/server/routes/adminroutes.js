import express, { Router } from 'express';
import { approveproduct, pendingproducts, rejectProduct } from '../controller/admincontroller.js';

import userauth  from '../middleware/userauth.js';
const adminroutes =express.Router();

adminroutes.get('/pendingproducts' ,userauth, pendingproducts);
adminroutes.put('/approveproducts',userauth , approveproduct);
adminroutes.delete('/rejectproduct' ,userauth, rejectProduct);

export default adminroutes;
 
