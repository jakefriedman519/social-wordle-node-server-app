import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("WordleGuessModel", schema);
export default model;
