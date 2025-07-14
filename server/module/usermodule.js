import mongoose, { Schema } from "mongoose";
const userinfo = new mongoose.Schema({
    Name : {type: String ,required :true},
    Email : {type: String ,required :true ,unique : true},
    Password : {type: String ,required :true },
    verifyOtp: {type: String ,default:''},
    verifyOtpExpire:{type: Number, default:0},
    accountVerified:{type: Boolean, default:false},
    resetotp: {type: String ,default:''},
    resetotpexpire: {type: Number ,default:0},
})
const usermodel = mongoose.models.user || mongoose.model('user', userinfo);
//if it finds the user it will fetch that otherwise create new user using user info

export default usermodel;
//to export from here and use in any other file 