import express from "express";
import { getAdminInfo, getAllProductStatus } from "../controller/admincontroller.js";
import { verifyAdmin } from "../middleware/userauth.js";

const adminroutes = express.Router();

adminroutes.get("/admininfo", verifyAdmin, getAdminInfo);
adminroutes.get("/productstatus", verifyAdmin, getAllProductStatus);

export default adminroutes;
