import user from "../module/usermodule.js";

export const approveSeller = async (req, res) => {
  try {
    const user = await user.findByIdAndUpdate(
      req.params.id,
      { status: "approved", verifiedseller: true },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Seller approved", user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const rejectSeller = async (req, res) => {
  try {
    const user = await user.findByIdAndUpdate(
      req.params.id,
      { status: "rejected", verifiedseller: false },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Seller rejected", user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
