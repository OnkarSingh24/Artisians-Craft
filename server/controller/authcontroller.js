import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import usermodel from '../module/usermodule.js';
import transporter from '../config/nodemailer.js';

export const register = async (req, res) => {
    const { Name, Email, Password } = req.body;
    if (!Name || !Email || !Password) {
        return res.json({ success: false, message: 'User not registered!' });
    }

    try {
        const existingUser = await usermodel.findOne({ Email });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = new usermodel({ Name, Email, Password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: Email,
            subject: 'Welcome to Desi Etsy!',
            text: `Welcome ${Name} to Desi Etsy! Your account has been created with email ID: ${Email}.
            
Thank you for joining Desi Etsy – your one-stop shop for authentic handmade treasures from local artisans.
We are excited to have you with us. Start exploring and support creativity that is truly desi.

Happy shopping!
Team Desi Etsy`
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'User registered successfully!' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.json({ success: false, message: "Wrong credentials entered!" });
    }

    try {
        const user = await usermodel.findOne({ Email });
        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true, message: "Login successful" });
    } catch (error) {
        return res.json({ success: false, message: "Wrong credentials entered!" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: "Successfully logged out!" });
    } catch (error) {
        return res.json({ success: false, message: "Error while logging out!" });
    }
};

export const sendotp = async (req, res) => {
    try {
        const {userID} = req.body;
        const user = await usermodel.findById(userID);

        if (user.accountVerified) {
            return res.json({ success: false, message: "Account is already verified!" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        // Optional: Secure OTP storage
        const hashedOtp = await bcrypt.hash(otp, 10);
        user.verifyOtp = hashedOtp;
        user.verifyOtpExpire = Date.now() + 2 * 60 * 1000; // 2 minutes
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.Email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP. It is valid for 2 minutes.`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: "OTP sent to email successfully",
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const verifyotp = async (req, res) => {
    const { userID, otp } = req.body;

    if (!userID || !otp) {
        return res.status(404).json({ success: false, message: "User not found!" });
    }

    try {
        const user = await usermodel.findById(userID);
        if (!user) {
            return res.json({ success: false, message: 'User not found!' });
        }

        const isMatch = await bcrypt.compare(otp, user.verifyOtp);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid OTP!" });
        }

        if (user.verifyOtpExpire < Date.now()) {
            return res.status(400).json({ success: false, message: "Expired OTP!" });
        }

        user.accountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpire = 0;
        await user.save();

        return res.status(200).json({ success: true, message: "Account verified successfully!" });
    } catch (error) {
        console.error("Error in verifyotp:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const isauthenticated =async(req,res)=>{
    try {
     return res.json({success:true}) ;       
    } 
    catch (error) {
        return res.json({success:false ,message:error.message});
    }
};

//send password reset otp
export const resetotp =async(req,res)=>{
    const {Email} =req.body;

    if(!Email){
        return res.json({success: false , message:'Email is required!'});
    }

    try {
       const user =await usermodel.findOne({Email}); 
     if(!user){
        return res.json({success:false ,message:'user not found!'});
     } 
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const hashedOtp = await bcrypt.hash(otp, 10);
    user.resetotp = hashedOtp;
    user.resetotpexpire= Date.now() + 2 * 60 * 1000; // 2 minutes
        await user.save();

    const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.Email,
            subject: 'Password reset OTP',
            text: `Your OTP for resetting ypur password is  ${otp}. use this otp to reset your password.It is valid for 2 mins only.`
    };
    await transporter.sendMail(mailOptions);
    return res.json({success:'true', message:'otp sent to your email'})
    
    } catch (error) {
        return res.json({success:false ,message:error.message}); 
    }
};

//reset user password 
export const resetpassword =async(req,res)=>{
    const {Email, otp , newpassword }=req.body;

    if(!Email || !otp || !newpassword){
        return res.json({ success:false , message:'missing credentials'});
    }
    try {
        const user = await usermodel.findOne({Email});
        if(!user){
            return res.json({ success:false , message:'user not found'});
        }
        if(user.resetotp ==""|| user.resetotp != otp){
            return res.json({ success:false , message:'Invalid otp'});
        }
        if(user.resetotpexpire < Date.now()){
            return res.json({success: false , message : 'otp expired'});
        }
        const hashedPassword= await bcrypt.hash(newpassword,10);
        user.Password =hashedPassword;
        user.resetotp='';
        user.resetotpexpire=0;

        return res



        
    } catch (error) {
        return res.json({success:false ,message:error.message});
    }
}
