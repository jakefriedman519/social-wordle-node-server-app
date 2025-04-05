import model from "./model.js";

export async function findWordleGuesses(query) {
  return model.find(query);
}

export async function createOrUpdateWordleGuess(wordle, userId) {
  return model.findOneAndUpdate(
    { userId, createdDate: wordle.createdDate },
    wordle,
    { upsert: true, new: true }
  );
}

export async function deleteWordle(wordleId) {
  return model.deleteOne({ _id: wordleId });
}
