import usermodel from '../module/usermodule.js';

// Get all sellers
export const getSellers = async (req, res) => {
  try {
    const sellers = await usermodel.find({ role: 'seller' });
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Approve seller
export const approveSeller = async (req, res) => {
  try {
    const updated = await usermodel.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Seller not found' });
    }
    res.status(200).json({ success: true, seller: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Reject seller
export const rejectSeller = async (req, res) => {
  try {
    const updated = await usermodel.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Seller not found' });
    }
    res.status(200).json({ success: true, seller: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
