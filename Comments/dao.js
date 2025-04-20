import model from "./model.js";

export async function createComment(comment) {
  const createdComment = await model.create(comment);
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
