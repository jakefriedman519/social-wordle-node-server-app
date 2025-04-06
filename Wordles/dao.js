import model from "./model.js";

export async function findWordles(query) {
  return model.find(query).populate("userId", "username");
}

export function createWordle(wordle) {
  return model.create(wordle);
}

export async function deleteWordle(wordleId) {
  return model.deleteOne({ _id: wordleId });
}
