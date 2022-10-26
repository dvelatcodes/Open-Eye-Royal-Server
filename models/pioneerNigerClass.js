import mongoose from "mongoose";
const pioneerNigerClassSchema = mongoose.Schema(
  {
    classNaming: {
      type: String,
      required: true,
    },
    classCategory: {
      type: String,
      required: true,
    },
    courses: {
      type: Array,
      required: true,
    },
    calenderSection: {
      type: String,
      required: true,
    },
    pioneerIdNum: {
      type: String,
      required: true,
    },
    schoolNaming: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PioneerNigerClass = mongoose.model(
  "PioneerNigerClass",
  pioneerNigerClassSchema
);

export default PioneerNigerClass;
