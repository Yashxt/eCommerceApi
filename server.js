import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRouter.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"

// config envb  // use to load evv lariable for .env file
dotenv.config();

//conncect database
connectDB();


const app = express();
// middle ware
app.use(cors());

app.use(morgan('dev'))
app.use(express.json());
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes);


const PORT = process.env.PORT ||9090;
app.listen( PORT,(req,res)=>{
    console.log("mjju bhai");
}) 