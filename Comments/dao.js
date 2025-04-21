import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
export async function createComment(comment) {
  const createdComment = await model.create({ ...comment, _id: uuidv4() });
  return model
    .findOne({ _id: createdComment._id })
    .populate("userId", "username");
}

export async function findCommentsByWordleDay(wordleDay) {
  return model.find({ wordleDay }).populate("userId", "username");
}

export async function findCommentsByUserId(userId) {
  return model.find({ userId }).populate("userId", "username");
}

export async function deleteCommentById(id) {
  return model.findOneAndDelete({ _id: id });
}
