import Mongoose from "mongoose";
const timetableSchema = Mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },
    monday: {
      type: Array,
      required: true,
    },
    tuesday: {
      type: Array,
      required: true,
    },
    wednesday: {
      type: Array,
      required: true,
    },
    thursday: {
      type: Array,
      required: true,
    },
    friday: {
      type: Array,
      required: true,
    },
    classType: {
      type: Array,
      required: true,
    },
    time: {
      type: Array,
      required: true,
    },
    pioneerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const NigerTimetable = Mongoose.model("NigerTimetable", timetableSchema);
export default NigerTimetable;
