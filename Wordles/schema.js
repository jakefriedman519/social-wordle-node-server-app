import mongoose from "mongoose";
const wordleSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, ref: "UserModel" }, // user id who created the wordle
    wordleWord: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    difficulty: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      default: "EASY",
    }, // difficulty level of the wordle
    title: { type: String, required: true }, // title of the wordle
  },
  { collection: "wordles" }
);
export default wordleSchema;
