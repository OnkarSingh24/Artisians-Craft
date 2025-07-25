import productmodel from "../module/productmodules.js";
import usermodel from "../module/usermodule.js";

export const getAdminInfo = async (req, res) => {
  try {
    // Fetch the admin from the database
    const admin = await usermodel.findOne({ role: "admin" }).select("Name Email role"); // exclude sensitive fields

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
    res.status(200).json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllProductStatus = async (req, res) => {
  try {
    const pending = await productmodel.find({ status: "pending" });
    const approved = await productmodel.find({ status: "approved" });
    const rejected = await productmodel.find({ status: "rejected" });

    res.status(200).json({
      success: true,
      pending,
      approved,
      rejected
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
