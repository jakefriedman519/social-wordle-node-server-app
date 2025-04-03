import model from "./model.js";

export async function findWordleById(wordleId) {
  return model.findById(wordleId);
}

export async function findWordlesByUserId(userId) {
  return model.find({ userId: userId });
}

export function createWordle(wordle) {
  return model.create(wordle);
}

export async function deleteWordle(wordleId) {
  return model.deleteOne({ _id: wordleId });
}
