import mongoose from "mongoose";
const schoolSchema = mongoose.Schema({
    schoolName : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true,
        unique : true,
    },
    schoolType : {
        type : String,
        unique : true,
        required : true
    },
    schoolState : {
        type : String,
        unique : true,
        required : true
    },
    exactSchoolAddress : {
        type : String,
        unique : true,
        required : true
    },
    schoolId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Pioneer",
        unique : true,
        required : true
    },
    pioneer : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Pioneer"
    }
},{timestamps : true})

const School = mongoose.model("School", schoolSchema);

export default School; 