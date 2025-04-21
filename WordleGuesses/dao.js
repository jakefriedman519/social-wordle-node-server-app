import model from "./model.js";
export async function findWordleGuesses(query) {
  return model.find(query).populate("userId", "username");
}

export async function createOrUpdateWordleGuess(wordle, userId) {
  if (!wordle.completed) {
    wordle.score = 0;
  } else {
    wordle.score = 60 - (wordle.guesses.length - 1) * 10;
  }
  return model.findOneAndUpdate(
    { userId, createdDate: wordle.createdDate },
    wordle,
    { upsert: true, new: true },
  );
}

export async function createOrUpdateCustomWordleGuess(wordle, userId) {
  if (!wordle.completed) {
    wordle.score = 0;
  } else {
    wordle.score = 60 - (wordle.guesses.length - 1) * 10;
  }
  return model.findOneAndUpdate({ userId, wordleId: wordle.wordleId }, wordle, {
    upsert: true,
    new: true,
  });
}

export async function deleteWordle(wordleId) {
  return model.deleteOne({ _id: wordleId });
}
