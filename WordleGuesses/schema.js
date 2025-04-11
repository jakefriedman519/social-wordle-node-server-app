import mongoose from "mongoose";
const wordleGuesseSchema = new mongoose.Schema(
  {
    _id: String,
    userId: { type: String, required: true, ref: "UserModel" }, // user id of the user playing the wordle
    wordleId: { type: String, required: true, ref: "WordleModel" }, // wordle id of the wordle being played
    guesses: { type: [String], required: true },
    completed: { type: Boolean, required: true }, // true if the wordle was completed within 6 guesses, false otherwise
    timeSpent: { type: Number, required: true }, // time spent on the wordle in seconds
    finishedDate: { type: Date, default: Date.now }, // date when the wordle was finished -> TODO: add a field to track the time taken to complete the wordle
    createdDate: { type: Date }, // date when the wordle was created (can be used to track the wordle of the day and past wordles)
    score: { type: Number }, // score of the wordle (guesses.length * 10 + timeSpent) IF completed
   },
  { collection: "wordleGuess" }
);
export default wordleGuesseSchema;