import mongoose from "mongoose";
const nigerianClassSchema = mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },
    classType: {
      type: String,
      required: true,
    },
    subjects: {
      type: Array,
      required: true,
    },
    calenderYear: {
      type: String,
      required: true,
      default: "",
    },
    pioneerId: {
      type: String,
      required: true,
      default: "",
    },
    schoolName: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

const NigerianClass = mongoose.model("NigerianClass", nigerianClassSchema);

export default NigerianClass;
