import express from "express";
import {
  approveSeller,
  rejectSeller,
} from "../controller/sellercontroller.js";

const statusroutes = express.Router();

statusroutes.put("/:id/approve", approveSeller);
statusroutes.put("/:id/reject", rejectSeller);

export default statusroutes;
