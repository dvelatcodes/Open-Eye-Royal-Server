import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
// if (app.get("env") !== "production") 
dotenv.config();
const db = process.env.db;
import router from "./routes/index.js";


const PORT = process.env.PORT || 5000;
app.use(express.json({limit : "50mb"}));
app.use(express.urlencoded({extended : true}));
app.use(cors());

app.use("/",router);

mongoose.connect(db, {useNewUrlParser : true}, {useUnifiedTopology : true}).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`database connected successfully and server running on ${PORT}`)
    })
}).catch((err)=>{
    console.log(err)
});