import model from "./model.js";
import wordleGuessesModel from "../WordleGuesses/model.js";
import userModel from "../Users/model.js";
import { v4 as uuidv4 } from "uuid";
export async function createTournament(tournament) {
  return model.create({ ...tournament, _id: uuidv4() });
}

export function findTournamentById(tournamentId) {
  return model
    .findById(tournamentId)
    .populate(["players", "creator"], "username");
}

export function findAllTournaments(query = {}) {
  return model.find(query).populate(["players", "creator"], "username");
}

export function joinTournament(tournamentId, userId) {
  return model
    .findByIdAndUpdate(
      tournamentId,
      { $addToSet: { players: userId } },
      { new: true },
    )
    .populate(["players", "creator"], "username");
}

export function endTournament(tournamentId) {
  return model.findByIdAndUpdate(
    tournamentId,
    { isEnded: true },
    { new: true },
  );
}

export function deleteTournament(tournamentId) {
  return model.deleteOne({ _id: tournamentId });
}

export async function getLeaderboard(tournamentId) {
  const tournament = await model.findById(tournamentId).lean();

  const start = new Date(tournament.startDate);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(tournament.endDate);
  end.setUTCHours(23, 59, 59, 999);

  // 1) get each player’s summed score
  const rawScores = await wordleGuessesModel.aggregate([
    {
      $match: {
        userId: { $in: tournament.players },
        wordleId: { $exists: false }, // all non‑custom wordles
        finishedDate: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: "$userId",
        totalScore: { $sum: "$score" },
      },
    },
  ]);
  const scoreMap = new Map(rawScores.map((r) => [r._id, r.totalScore]));

  // 2) fetch players and build the leaderboard, defaulting missing scores to 0
  const users = await userModel
    .find({ _id: { $in: tournament.players } }, "username")
    .lean();

  return users
    .map((u) => ({
      userId: u._id,
      username: u.username,
      totalScore: scoreMap.get(u._id) || 0,
    }))
    .sort((a, b) => b.totalScore - a.totalScore);
}

export function findTournamentsByUserId(userId) {
  return model.find({ players: userId });
}
