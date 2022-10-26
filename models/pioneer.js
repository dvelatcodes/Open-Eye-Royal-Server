import mongoose from "mongoose";
const pioneerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

pioneerSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const Pioneer = mongoose.model("Pioneer", pioneerSchema);
export default Pioneer;
