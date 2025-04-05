import mongoose from "mongoose";
const wordleGuesseSchema = new mongoose.Schema(
  {
    _id: String,
    userId: { type: String, required: true, ref: "UserModel" }, // user id of the user playing the wordle
    wordleId: { type: String, required: true, ref: "WordleModel" }, // wordle id of the wordle being played
    guesses: { type: [String], required: true },
    completed: { type: Boolean, required: true }, // true if the wordle was completed within 6 guesses, false otherwise
    finishedDate: { type: Date, default: Date.now }, // date when the wordle was completed
    createdDate: { type: Date, default: Date.now }, // date when the wordle was created (can be used to track the wordle of the day and past wordles)
   },
  { collection: "wordleGuess" }
);
export default wordleGuesseSchema;