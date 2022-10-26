import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Pioneer from "../models/pioneer.js";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";
import NonStudent from "../models/nonStudent.js";

dotenv.config();

export const authPioneer = async(req, res, next) => {
    let token;
    try{if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.Access_Token_Secret);
        req.pioneer = await Pioneer.findById(decoded.id).select("-password");
        next();
    }}catch(err){
        console.log(err);
        res.status(401);
        throw new Error("Unauthorized user")
    }
    if(!token){
        res.status(401);
        throw new Error("Unauthorized user");
    }
}

// export const authTeacher = (req,res,next) => {
//     let token;
//     try{if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
//         token = req.headers.authorization.split(" ")[1];
//         const decoded = jwt.verify(token, process.env.Access_Token_Secret);
//         req.teacher = await Teacher.findById(decoded.id).select('-password');
//         next();
//     }}catch(err){
//         console.log(err);
//         res.status(401);
//         throw new Error("teacher not authorized")
//     }
    
//     if(!token){
//         res.status(401);
//         throw new Error("teacher not authorized");
//     }
// }