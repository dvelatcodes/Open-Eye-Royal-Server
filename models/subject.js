import mongoose from "mongoose";
const subjectSchema = mongoose.Schema({
    sujectName : {
        type : String,
        required : true
    },
    className : {
        type : String,
        required : true,
        unique : true
    },
    subjectTeacherName : {
        type : String,
        required : true,
        unique : true
    },
    schoolName : {
        type : String,
        required : true,
        unique : true,
        ref : "School"
    }
}, {timeStamps : true});

const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;