import express from 'express';
import { isauthenticated, login, logout, register,resetotp,resetpassword,sendotp,verifyotp } from '../controller/authcontroller.js';
const authroutes =express.Router();
import userauth from '../middleware/userauth.js';

authroutes.post('/register' ,register);
authroutes.post('/login' ,login);
authroutes.post('/logout' ,logout);
authroutes.post('/sendotp', userauth, sendotp);
authroutes.post('/verifyaccount', userauth, verifyotp);
authroutes.post('/isauth', userauth, isauthenticated);
authroutes.post('/send-reset-otp', resetotp);
authroutes.post('/resetpassword', resetpassword);


export default authroutes;
