import express from 'express';
import{ approveSeller, getSellers, rejectSeller } from "../controller/sellercontroller.js";


const statusroutes =express.Router();
statusroutes.get("/fetchuser", getSellers); // fetchUsers
statusroutes.put("/:id/approve", approveSeller); // handleApprove
statusroutes.put("/:id/reject", rejectSeller);   // handleReject
export default statusroutes;