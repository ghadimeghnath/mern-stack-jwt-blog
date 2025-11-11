import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from "cookie-parser";
import router from './routes/Blogs.js';
import AuthRouter from './routes/AuthRoute.js';
import 'dotenv/config';
import AdminRouter from './routes/AdminRoute.js';
import mongoDb from './config/mongoDb.js';

let app = express();
let port = process.env.PORT ||3001;
await mongoDb()

let allowedOrigins = ['http://localhost:5173', "https://mernstack-jwt-blog.onrender.com"]
app.use(cors({origin: allowedOrigins, credentials:true}));  
app.use(cookieParser());
app.use(express.json());


app.get('/',(req, res)=>{
    res.send("Server sarted");
})
app.use('/api/auth',AuthRouter);
app.use('/api/auth/admin',AdminRouter);
app.use('/blogs',router)

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})