import mongoose from "mongoose";
const wordleSchema = new mongoose.Schema(
  {
    _id: String,
    userId: { type: String, required: true, ref: "UserModel" }, // user id who created the wordle
    wordleWord: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    difficulty: {
      type: String,
      enum: ["EASY", "MEDIIUM", "HARD"],
      default: "EASY",
    }, // difficulty level of the wordle
  },
  { collection: "wordles" }
);
export default wordleSchema;
