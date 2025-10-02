import express from "express";
import cors from "cors";
import 'dotenv/config';
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import authroutes from './routes/authroutes.js'
import productroutes from './routes/productroutes.js';
import userrouter from "./routes/userroutes.js";
import adminroutes from "./routes/adminroutes.js";
import cartrouter from "./routes/orderroutes.js";
import connectDB from './config/mongodb.js';
import statusroutes from "./routes/statusroutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port =process.env.PORT|| 4000 ;

connectDB();
const allowedorigin =['http://localhost:5173'];
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedorigin ,credentials:true}));


//import { connect } from "mongoose";

//API end points 
app.get('/', (req, res) => {
 res.send("API working");//to chk the server running this should be on screen 
});

app.use ('/api/auth', authroutes);
app.use ('/api/user', userrouter);
app.use('/api/crud', productroutes);
app.use('/api/admin', adminroutes );
app.use('/api/status' , statusroutes);
app.use('/api/cart' , cartrouter);

app.use(express.static(path.join(__dirname, "../Frontened/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontened/dist", "index.html"));
});


app.listen(port, ()=> {
    console.log(`server running on port: ${port}`);

});
