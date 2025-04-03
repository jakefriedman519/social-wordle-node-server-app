import model from "./model.js";

export async function findWordleById(wordleId) {
  return model.findById(wordleId);
}

export async function findWordlesByUserId(userId) {
  return model.find({ userId: userId });
}

export async function findWordleByDate(date) {
  return model.find({ date: date });
}

export async function findWordlesByTournamentId(tournamentId) {
  return model.find({ tournamentId: tournamentId });
}

export async function createWordle(wordle) {
  return model.create(wordle);
}

export async function deleteWordle(wordleId) {
  return model.deleteOne({ _id: wordleId });
}
