import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    _id: String,
    userId: { type: String, required: true, ref: "UserModel" }, // user id who created the wordle
    wordleDay: { type: String, required: true },
    text: { type: String, required: true },
  },
  { collection: "comments" },
);
export default commentSchema;
