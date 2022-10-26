import mongoose from "mongoose";
const teacherSchema = mongoose.Schema({
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
    },
    schoolName : {
        type : String,
        required : true,
        unique : true
    },
    subjectName : {
        type : String,
        required : true,
        ref : "Subject"
    },
    accessId : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : "Subject"
    },
    pioneer : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : "Pioneer"
    }
},{timestamps : true})

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;