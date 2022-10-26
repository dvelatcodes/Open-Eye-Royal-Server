import mongoose from "mongoose";
const studentSchema = mongoose.Schema(
  {
    studentFirstName: {
      type: String,
      required: true,
    },
    studentLastName: {
      type: String,
      required: true,
    },
    studentEmail: {
      type: String,
      required: true,
      unique: true,
    },
    studentPassword: {
      type: String,
      required: true,
    },
    studentPhoneNumber: {
      type: String,
      required: true,
    },
    male: {
      type: String,
      required: true,
    },
    female: {
      type: String,
      required: true,
    },
    studentClass: {
      type: String,
      required: true,
      default: "no class",
    },
    pioneerId: {
      type: String,
      required: true,
      default: "none",
    },
  },
  { timestamps: true }
);

studentSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};
const Student = mongoose.model("Students", studentSchema);

export default Student;
