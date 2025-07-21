import usermodel from "../module/usermodule.js";

export const getuserdata = async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await usermodel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            userdata: {
                name: user.Name,
                isaccountVerified: user.accountVerified
            }
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
