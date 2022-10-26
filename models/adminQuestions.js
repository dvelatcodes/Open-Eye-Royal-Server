import mongoose from "mongoose";
const adminQuestionSchema = mongoose.Schema(
  {
    defaultQuestions: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const AdminQuestions = mongoose.model("AdminQuestions", adminQuestionSchema);

export default AdminQuestions;
