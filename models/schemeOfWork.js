import mongoose from "mongoose";
const schemeSchema = mongoose.Schema({
    subjectName : {
        type : String,
        required : true,
        ref : "Subject"
    },
    schoolName : {
        type : String,
        required : true,
        ref : "School"
    },
    className : {
        type : String,
        required : true,
        ref : "Class"
    },
    weeks : {
        type : Array,
        required : true
    }
},{timestamps : true})

const SchemeOfWork = mongoose.model("SchemeOfWork", schemeSchema);
export default SchemeOfWork;