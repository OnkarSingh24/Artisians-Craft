import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import authroutes from './routes/authroutes.js'
import productroutes from './routes/productroutes.js';
import userrouter from "./routes/userroutes.js";
import connectDB from './config/mongodb.js';

const app = express();
const port =process.env.PORT|| 4000 ;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true}));


//import { connect } from "mongoose";

//API end points 
app.get('/', (req, res) => {
 res.send("API working");//to chk the server running this should be on screen 
});

app.use ('/api/auth', authroutes);
app.use ('/api/user', userrouter);
app.use('/api/products', productroutes);



app.listen(port, ()=> {
    console.log(`server running on port: ${port}`);

});
