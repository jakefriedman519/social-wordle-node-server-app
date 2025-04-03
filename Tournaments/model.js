import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("TournamentModel", schema);
export default model;
