import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("WordleModel", schema);
export default model;
