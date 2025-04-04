import mongoose from "mongoose";
const tournamentSchema = new mongoose.Schema(
  {
    _id: String,
    adminUserId: { type: String, required: true, ref: "UserModel" }, // user id of the admin creating the tournament
    wordleId: { type: String, required: true, ref: "WordleModel" }, // wordle id of the wordle game played in the tournament
    users: [
      {
        userId: { type: String, required: true, ref: "UserModel" }, // user id of the user playing the tournament
        wordleGuess: { type: String, required: true, ref: "WordleGuessModel" }, // wordle id of the wordle game played by the user
        guesses: { type: Number, required: true },
        completedTimeInSeconds: { type: Number, required: true },
        lastActivity: { type: Date, default: Date.now },
      },
    ],
    numberOfGuesses: { type: Number, default: 6 }, // number of guesses allowed in the tournament
    tournamentName: { type: String, required: true }, // name of the tournament
    startDate: { type: Date, required: true, default: Date.now },
    endDate: { type: Date, required: true, default: Date.now },
  },
  { collection: "tournaments" }
);
export default tournamentSchema;