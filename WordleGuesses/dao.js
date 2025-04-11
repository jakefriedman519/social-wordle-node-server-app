import model from "./model.js";

export async function findWordleGuesses(query) {
  return model.find(query).populate("userId", "username");
}

export async function createOrUpdateWordleGuess(wordle, userId) {
  if (!wordle.completed) {
    wordle.score = -1;
  } else {
    wordle.score = wordle.guesses.length * 10 + wordle.timeSpent;
  }
  return model.findOneAndUpdate(
    { userId, createdDate: wordle.createdDate },
    wordle,
    { upsert: true, new: true }
  );
}

export async function createOrUpdateCustomWordleGuess(wordle, userId) {
  return model.findOneAndUpdate({ userId, wordleId: wordle.wordleId }, wordle, {
    upsert: true,
    new: true,
  });
}

export async function deleteWordle(wordleId) {
  return model.deleteOne({ _id: wordleId });
}
