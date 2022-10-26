import mongoose from "mongoose";
const nonStudentSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true
    }, 
    lastName : {
        type : String,
        required : true
    }, 
    email : {
        type : String,
        required : true,
        unique : true
    }, 
    password : {
        type : String,
        required : true,
        unique : true
    }, 
    phoneNumber : {
        type : String,
        required : true,
        unique : true        
    }
},{timestamps : true})

const NonStudent = mongoose.model("NonStudent", nonStudentSchema);
export default NonStudent;