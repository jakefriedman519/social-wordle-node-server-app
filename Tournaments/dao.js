import model from "./model.js";

export async function findTournamentById(tournamentId) {
  return model.findById(tournamentId);
}

export async function findTournamentsByUserId(userId) {
  return model.find({ userId: userId });
}

export async function findTournamentUsersAndGuessesById(tournamentId) {
  return model.find({ tournamentId: tournamentId }).select("users").populate("userId").populate("wordleGuess");
}

export async function createTournament(tournament) {
  return model.create(tournament);
}

export async function deleteTournament(tournamentId) {
  return model.deleteOne({ _id: tournamentId });
}

export async function updateTournament(tournamentId, tournament) {
  return model.updateOne({ _id: tournamentId }, { $set: tournament });
}
