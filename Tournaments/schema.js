import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
  {
    _id: String,
    name: { type: String, required: true },
    creator: { type: String, required: true, ref: "UserModel" }, // userId of creator
    maxPlayers: { type: Number, required: true },
    players: [{ type: String, ref: "UserModel" }], // array of userIds
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isEnded: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now },
  },
  { collection: "tournaments" },
);

export default tournamentSchema;
